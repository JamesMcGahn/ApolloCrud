import Post from '../../models/Post.mjs';

const getArticles = async (parent, args, context) => {
  const { user } = context;
  const { page, category, status, tag } = args;

  let posts;
  const query = {};
  query.$and = [{ type: 'article' }];

  if (category) {
    query.$and.push({ category: category });
  }

  if (tag) {
    query.$and.push({ tags: tag });
  }

  if (!user || user.role === 'user') {
    query.$and.push({ isPrivate: false });
    query.$and.push({ status: 'published' });
    posts = await Post.paginate(query, {
      customLabels: { docs: 'posts' },
      limit: 6,
      page: page || 1,
    });

    if (posts?.posts && posts.posts.length > 0) {
      const postsArr = posts.posts.map((post) => ({
        ...post._doc,
        id: post._doc._id,
        author: {
          name: post._doc.author.name,
          role: post._doc.author.role,
          isActive: post._doc.author.isActive,
        },
      }));
      return { ...posts, posts: postsArr };
    }
  }

  if (status) {
    query.$and.push({ status: status });
  }

  posts = await Post.paginate(query, {
    customLabels: { docs: 'posts' },
    limit: 6,
    page: page || 1,
  });

  return posts;
};

const articlesCategories = async (parent, args, context) => {
  return await Post.distinct('category', { type: 'article' });
};
const articlesTags = async (parent, args, context) => {
  return await Post.distinct('tags', { type: 'article' });
};

const articleSuggested = async (parent, args, context) => {
  const { slug } = args;

  const post = await Post.findOne({ slug: slug });

  const featuredPosts = [];

  if (post) {
    const posts = await Post.find(
      {
        $and: [
          { slug: { $ne: slug } },
          { category: post.category },
          { type: 'article' },
        ],
      },
      null,
      { limit: 5, sort: { createdAt: -1 } },
    );
    featuredPosts.push(...posts);

    if (featuredPosts.length < 5) {
      const tagPosts = await Post.find(
        {
          $and: [
            { slug: { $ne: slug } },
            { tags: { $in: post.tags } },
            { type: 'article' },
          ],
        },
        null,
        { limit: 5 - featuredPosts.length, sort: { createdAt: -1 } },
      );
      featuredPosts.push(...tagPosts);
    }
  }

  if (featuredPosts.length < 5) {
    const fetPosts = await Post.find(
      {
        $and: [
          { slug: { $ne: slug } },
          { category: 'featured' },
          { type: 'article' },
        ],
      },
      null,
      { limit: 5 - featuredPosts.length, sort: { createdAt: -1 } },
    );
    featuredPosts.push(...fetPosts);
  }

  if (featuredPosts.length < 5) {
    const allPosts = await Post.find(
      {
        $and: [{ slug: { $ne: slug } }, { type: 'article' }],
      },
      null,
      { limit: 5 - featuredPosts.length, sort: { createdAt: -1 } },
    );
    featuredPosts.push(...allPosts);
  }

  return featuredPosts;
};

export { getArticles, articlesCategories, articlesTags, articleSuggested };
