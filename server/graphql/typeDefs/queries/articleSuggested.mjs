import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const articleSuggestedSchema = new QMSchemaGenerator(
  'articleSuggested',
  {
    slug: {
      type: 'String!',
      description: 'Slug of the article',
    },
  },
  {
    type: '[post]',
    description: 'Array of Suggested article',
  },
);

const articleSuggested = articleSuggestedSchema.getSchemaString();

export default articleSuggested;
