import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const mergedTicketSchema = new TEISchemaGenerator('mergedTicket', 'type', {
  mergeTicket: {
    type: 'ticket',
    description: 'Updated merged Ticket.',
  },
  mergedIntoTicket: {
    type: 'ticket',
    description: 'Updated merged into Ticket.',
  },
});

const mergedTicket = mergedTicketSchema.getSchemaString();
export default mergedTicket;
