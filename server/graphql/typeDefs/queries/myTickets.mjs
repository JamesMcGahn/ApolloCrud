// myTickets(userId: ID!, status: [statusType]): [ticket!]
import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const myTicketsSchema = new QMSchemaGenerator(
  'myTickets',
  {
    userId: {
      type: 'ID!',
      description: 'The ID of the user.',
    },
    status: {
      type: '[statusType]',
      description: 'The status of the tickets to return.',
    },
  },
  {
    type: '[ticket!]',
    description: "The list of user ID's tickets",
  },
);

const myTickets = myTicketsSchema.getSchemaString();

export default myTickets;
