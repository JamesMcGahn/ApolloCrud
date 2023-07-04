import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const deleteBlogSchema = new QMSchemaGenerator(
  'deleteBlog',
  {
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

const deleteBlog = deleteBlogSchema.getSchemaString();

export default deleteBlog;
