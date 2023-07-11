import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateArticleSchema = new QMSchemaGenerator(
  'updateArticle',
  {
    updatePost: {
      type: 'updatePost!',
      description: 'Object of updated article information',
    },
    slug: {
      type: 'String',
      description: 'The slug of the article',
    },
    articleId: {
      type: 'ID',
      description: 'The ID of the article.',
    },
  },
  {
    type: 'post!',
    description: 'The updated article information',
  },
);

const updateArticle = updateArticleSchema.getSchemaString();

export default updateArticle;
