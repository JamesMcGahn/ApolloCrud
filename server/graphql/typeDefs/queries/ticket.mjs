import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const ticketSchema = new QMSchemaGenerator(
  'ticket',
  {
    id: {
      type: 'ID',
      description: 'The ID of the ticket.',
    },
  },
  {
    type: 'ticket!',
    description: 'The ticket of the ID passed.',
  },
);

const ticket = ticketSchema.getSchemaString();

export default ticket;
