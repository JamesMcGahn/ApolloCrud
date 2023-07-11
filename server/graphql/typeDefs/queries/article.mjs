import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const articleSchema = new QMSchemaGenerator(
  'article',
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
    description: 'The article information',
  },
);

const article = articleSchema.getSchemaString();

export default article;
