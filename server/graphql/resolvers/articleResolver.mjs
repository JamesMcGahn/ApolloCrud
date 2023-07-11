import { GraphQLError } from 'graphql';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../../models/Post.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const createArticle = async (parent, args, context) => {
  protectRoute(context, ['user']);
  const { newPost } = args;

  const post = await Post.create({
    ...newPost,
    type: 'article',
    slug: slugify(newPost.title, {
      lower: true,
      trim: true,
    }),
    images: [],
    featuredImage: {
      url: null,
      filename: null,
    },
  });

  return post.populate('author');
};

const updateArticle = async (parent, args, context) => {
  protectRoute(context, ['user']);
  const { updatePost, slug, articleId } = args;
  let newSlug;

  if (!slug && !articleId) {
    throw new GraphQLError('Please provide a slug or article ID', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (updatePost.title) {
    newSlug = slugify(updatePost.title, {
      lower: true,
      trim: true,
    });
  }

  const post = await Post.findOneAndUpdate(
    {
      $and: [
        { type: 'article' },
        { $or: [{ slug: slug }, { _id: articleId }] },
      ],
    },
    {
      ...updatePost,
      slug: newSlug,
      type: 'article',
    },
    {
      returnDocument: 'after',
    },
  );

  if (!post) {
    throw new GraphQLError('We cannot find that article post', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return post;
};

const getArticle = async (parent, args, context) => {
  const { user } = context;
  const { slug, articleId } = args;
  let post;
  if (!slug && !articleId) {
    throw new GraphQLError('Please provide a slug or article ID', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  if (!user || user.role === 'user') {
    post = await Post.findOne({
      $and: [
        { type: 'article' },
        { isPrivate: false },
        { status: 'published' },
        { $or: [{ slug: slug }, { _id: articleId }] },
      ],
    });
    if (!user && post) {
      post = {
        ...post._doc,
        id: post._doc._id,
        author: {
          name: post._doc.author.name,
          role: post._doc.author.role,
          isActive: post._doc.author.isActive,
        },
      };
    }
  }

  if (user && user.role !== 'user') {
    post = await Post.findOne({
      $and: [
        { type: 'article' },
        { $or: [{ slug: slug }, { _id: articleId }] },
      ],
    });
  }

  if (!post) {
    throw new GraphQLError('We cannot find that article post', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return post;
};

const deleteArticle = async (parent, args, context) => {
  protectRoute(context, ['user']);
  const { slug, articleId } = args;

  if (!slug && !articleId) {
    throw new GraphQLError('Please provide a slug or article ID', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  const post = await Post.findOneAndDelete({
    $or: [{ slug: slug }, { _id: articleId }],
  });

  if (!post) {
    throw new GraphQLError('We cannot find that article post', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (post.images && post.images.length > 0) {
    const delImages = [...post.images];

    const results = delImages.map(async (pic) => {
      return await cloudinary.uploader.destroy(pic.filename);
    });

    await Promise.all(results);
  }

  return post;
};

export { createArticle, getArticle, updateArticle, deleteArticle };
