import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateTicketsSchema = new QMSchemaGenerator(
  'updateTickets',
  {
    ids: {
      type: '[ID!]',
      description: 'The IDs of the tickets',
    },
    updateTickets: {
      type: 'updateTicket',
      description: 'Object of updated ticket information',
    },
  },
  {
    type: '[ticket!]',
    description: 'The updated tickets.',
  },
);

const updateTickets = updateTicketsSchema.getSchemaString();

export default updateTickets;
