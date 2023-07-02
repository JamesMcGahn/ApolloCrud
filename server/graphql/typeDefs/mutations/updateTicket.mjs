import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateTicketSchema = new QMSchemaGenerator(
  'updateTicket',
  {
    id: {
      type: 'ID!',
      description: 'The ID of the ticket',
    },
    updateTicket: {
      type: 'updateTicket',
      description: 'Object of updated ticket information',
    },
  },
  {
    type: 'ticket!',
    description: 'The updated ticket.',
  },
);

const updateTicket = updateTicketSchema.getSchemaString();

export default updateTicket;
