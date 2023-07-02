import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const createTicketSchema = new QMSchemaGenerator(
  'createTicket',
  {
    newTicket: {
      type: 'newTicket',
      description: 'Object of new ticket information',
    },
  },
  {
    type: 'ticket!',
    description: 'The new of ticket',
  },
);

const createTicket = createTicketSchema.getSchemaString();

export default createTicket;
