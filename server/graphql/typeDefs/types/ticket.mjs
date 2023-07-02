import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const ticketSchema = new TEISchemaGenerator('ticket', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the Ticket',
  },
  group: {
    type: 'groupInfo',
    description: 'The group that the ticket belongs to.',
  },
  assignee: {
    type: 'userInfo',
    description: 'The assignee of the ticket.',
  },
  requester: {
    type: 'userInfo',
    description: 'The requester of the ticket',
  },
  title: {
    type: 'String!',
    description: 'The title of the Ticket',
  },
  description: {
    type: 'String!',
    description: 'The description of the Ticket',
  },
  updatedAt: {
    type: 'Date',
    description:
      'The date time that the ticket was last updated. Unix timestamp in milliseconds',
  },
  createdAt: {
    type: 'Date',
    description:
      'The date time that the ticket was created. Unix timestamp in milliseconds',
  },
  priority: {
    type: 'priorityType',
    description: 'The priority level of the ticket.',
  },
  status: {
    type: 'statusType',
    description: 'The current status of the ticket.',
  },
  comments: {
    type: '[comment!]',
    description: 'Array of comments for the ticket',
  },
});

const ticket = ticketSchema.getSchemaString();
export default ticket;
