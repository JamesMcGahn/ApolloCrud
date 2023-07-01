import QMSchemaGenerator from './QMSchemaGenerator.mjs';

const ticketsSchema = new QMSchemaGenerator(
  'tickets',
  {
    status: {
      type: '[StatusType]',
      description: 'The status of the tickets',
    },
    companyId: {
      type: 'ID',
      description: 'The ID of the company',
    },
  },
  {
    type: '[Ticket!]',
    description: 'The list of tickets',
  },
);

const tickets = ticketsSchema.getSchemaString();
console.log(tickets);

export default tickets;
