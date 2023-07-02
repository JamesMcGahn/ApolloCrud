import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const deleteTicketSchema = new QMSchemaGenerator(
  'deleteTicket',
  {
    id: {
      type: 'ID!',
      description: 'The ID of the ticket',
    },
  },
  {
    type: 'ticket!',
    description: 'The deleted ticket.',
  },
);

const deleteTicket = deleteTicketSchema.getSchemaString();

export default deleteTicket;
