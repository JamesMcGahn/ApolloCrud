import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const ticketsSearchSchema = new QMSchemaGenerator(
  'ticketsSearch',
  {
    search: {
      type: 'String!',
      description: 'The search query string.',
    },
  },
  {
    type: '[ticket!]',
    description: 'The list of tickets',
  },
);

const ticketsSearch = ticketsSearchSchema.getSchemaString();

export default ticketsSearch;
