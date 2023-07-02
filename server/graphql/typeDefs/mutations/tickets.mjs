import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const ticketsSchema = new QMSchemaGenerator(
  'tickets',
  {
    status: {
      type: '[statusType]',
      description: 'The status of the tickets',
    },
    companyId: {
      type: 'ID',
      description: 'The ID of the company',
    },
  },
  {
    type: '[ticket!]',
    description: 'The list of tickets',
  },
);

const tickets = ticketsSchema.getSchemaString();

export default tickets;
