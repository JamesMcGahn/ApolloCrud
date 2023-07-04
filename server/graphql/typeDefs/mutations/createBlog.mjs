import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const createBlogSchema = new QMSchemaGenerator(
  'createBlog',
  {
    newPost: {
      type: 'newPost',
      description: 'Object of new blog information',
    },
  },
  {
    type: 'post!',
    description: 'The new blog information',
  },
);

const createBlog = createBlogSchema.getSchemaString();

export default createBlog;
