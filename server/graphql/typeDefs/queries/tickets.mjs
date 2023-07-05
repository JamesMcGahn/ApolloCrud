import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const ticketsSchema = new QMSchemaGenerator(
  'tickets',
  {
    status: {
      type: '[statusType]',
      description: 'The status of the tickets to return.',
    },
    companyId: {
      type: 'ID',
      description: 'The ID of the company.',
    },
    groupId: {
      type: 'ID',
      description: 'The ID of the group.',
    },
    unassigned: {
      type: 'Boolean',
      description: 'Ticket is not assigned',
    },
  },
  {
    type: '[ticket!]',
    description: 'The list of tickets',
  },
);

const tickets = ticketsSchema.getSchemaString();

export default tickets;
