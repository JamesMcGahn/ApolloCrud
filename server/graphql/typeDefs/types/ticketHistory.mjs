import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const ticketHistorySchema = new TEISchemaGenerator('ticketHistory', 'type', {
  updaterName: {
    type: 'String!',
    description: 'The name of the updater.',
  },
  updaterId: {
    type: 'ID!',
    description: 'The ID of the updater.',
  },
  type: {
    type: 'historyUpdateType',
    description: 'The type of the history event. Update or create.',
  },
  group: {
    type: 'ID',
    description: 'The ID of the group',
  },
  assignee: {
    type: 'ID',
    description: 'The ID of the assignee',
  },
  requester: {
    type: 'ID',
    description: 'The ID of the requester',
  },
  title: {
    type: 'String',
    description: 'The title of the Ticket',
  },
  description: {
    type: 'String',
    description: 'The description of the Ticket',
  },
  priority: {
    type: 'priorityType',
    description: 'The priority level of the ticket.',
  },
  status: {
    type: 'statusType',
    description: 'The current status of the ticket.',
  },
  updatedAt: {
    type: 'Date',
    description:
      'The date time that the ticket was last updated. Unix timestamp in milliseconds',
  },
  comment: {
    type: 'ticketHistoryComment',
    description: 'Array of comments for the ticket',
  },
});

const ticketHistory = ticketHistorySchema.getSchemaString();
export default ticketHistory;
