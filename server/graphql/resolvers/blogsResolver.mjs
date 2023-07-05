import Post from '../../models/Post.mjs';

const getBlogs = async (parent, args, context) => {
  const { user } = context;
  const { page, category } = args;
  let posts;
  const query = {};
  query.$and = [{ type: 'blog' }];

  if (category) {
    query.$and.push({ category: { $elemMatch: { $eq: category } } });
  }

  if (!user || user.role === 'user') {
    query.$and.push({ isPrivate: false });
    posts = await Post.paginate(query, {
      customLabels: { docs: 'posts' },
      limit: 5,
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

  posts = await Post.paginate(query, {
    customLabels: { docs: 'posts' },
    limit: 5,
    page: page || 1,
  });

  return posts;
};

// trunk-ignore(eslint/import/prefer-default-export)
export { getBlogs };
