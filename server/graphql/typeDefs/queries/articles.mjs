import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const articlesSchema = new QMSchemaGenerator(
  'articles',
  {
    category: {
      type: 'String',
      description: 'The category of the articles.',
    },
    tag: {
      type: 'String',
      description: 'The tag of the articles.',
    },
    page: {
      type: 'Int',
      description: 'The page number of articles returned',
    },
    status: {
      type: 'postStatusType',
      description: 'Draft or Published posts. Restricted to Agents.',
    },
  },
  {
    type: 'posts',
    description: 'The blog information',
  },
);

const articles = articlesSchema.getSchemaString();

export default articles;
