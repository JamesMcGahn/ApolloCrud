import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const deleteTicketsSchema = new QMSchemaGenerator(
  'deleteTickets',
  {
    id: {
      type: '[ID!]',
      description: 'The IDs of the ticket',
    },
  },
  {
    type: '[ID]',
    description: 'The IDs of the deleted tickets.',
  },
);

const deleteTickets = deleteTicketsSchema.getSchemaString();

export default deleteTickets;
