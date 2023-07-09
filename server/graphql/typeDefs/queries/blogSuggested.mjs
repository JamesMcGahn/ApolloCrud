import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const blogSuggestedSchema = new QMSchemaGenerator(
  'blogSuggested',
  {
    slug: {
      type: 'String!',
      description: 'Slug of the blog',
    },
  },
  {
    type: '[post]',
    description: 'Array of Suggested Blog',
  },
);

const blogSuggested = blogSuggestedSchema.getSchemaString();

export default blogSuggested;
