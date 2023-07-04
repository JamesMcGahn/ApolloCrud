import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateBlogSchema = new QMSchemaGenerator(
  'updateBlog',
  {
    updatePost: {
      type: 'updatePost!',
      description: 'Object of updated blog information',
    },
    slug: {
      type: 'String',
      description: 'The slug of the blog',
    },
    blogId: {
      type: 'ID',
      description: 'The ID of the blog.',
    },
  },
  {
    type: 'post!',
    description: 'The updated blog information',
  },
);

const updateBlog = updateBlogSchema.getSchemaString();

export default updateBlog;
