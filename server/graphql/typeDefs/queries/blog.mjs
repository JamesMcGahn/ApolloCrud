import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const blogSchema = new QMSchemaGenerator(
  'blog',
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
    description: 'The blog information',
  },
);

const blog = blogSchema.getSchemaString();

export default blog;
