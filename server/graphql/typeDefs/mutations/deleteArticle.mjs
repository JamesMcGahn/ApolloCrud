import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const deleteArticleSchema = new QMSchemaGenerator(
  'deleteArticle',
  {
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

const deleteArticle = deleteArticleSchema.getSchemaString();

export default deleteArticle;
