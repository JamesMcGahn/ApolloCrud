import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const mergeTicketsSchema = new QMSchemaGenerator(
  'mergeTickets',
  {
    ticket: {
      type: 'ID!',
      description: 'The IDs of the tickets',
    },
    mergeTicket: {
      type: 'ID!',
      description: 'Object of updated ticket information',
    },
  },
  {
    type: 'mergedTicket!',
    description:
      'Returns the merged ticket and the ticket that was merged into.',
  },
);

const mergeTickets = mergeTicketsSchema.getSchemaString();

export default mergeTickets;
