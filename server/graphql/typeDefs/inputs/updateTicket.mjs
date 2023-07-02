import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const updateTicketSchema = new TEISchemaGenerator('updateTicket', 'input', {
  assignee: {
    type: 'ID',
    description: 'The ID of assignee of the ticket.',
  },
  group: {
    type: 'ID',
    description: 'The ID of group that the ticket belongs to.',
  },
  requester: {
    type: 'ID',
    description: 'The ID of requester of the ticket',
  },
  title: {
    type: 'String',
    description: 'The title of the Ticket',
  },
  description: {
    type: 'String',
    description: 'The description of the Ticket',
  },
  status: {
    type: 'statusType',
    description: 'The status of the new ticket. Defaults to "NEW".',
  },
  comment: {
    type: 'newComment',
    description: 'Comment details',
  },
  priority: {
    type: 'priorityType',
    description: 'The priority level of the ticket.',
  },
});

const updateTicket = updateTicketSchema.getSchemaString();
export default updateTicket;
