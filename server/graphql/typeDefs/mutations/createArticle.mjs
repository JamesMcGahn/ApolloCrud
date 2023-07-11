import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const createArticleSchema = new QMSchemaGenerator(
  'createArticle',
  {
    newPost: {
      type: 'newPost',
      description: 'Object of new article information',
    },
  },
  {
    type: 'post!',
    description: 'The new article information',
  },
);

const createArticle = createArticleSchema.getSchemaString();

export default createArticle;
