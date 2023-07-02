import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const ticketReviewSchema = new TEISchemaGenerator('ticketReview', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the Ticket Review',
  },
  ticket: {
    type: 'ID!',
    description: 'The ID of the Ticket',
  },
  rating: {
    type: 'Int!',
    description: 'The rating of the ticket. 1-5',
  },
  comment: {
    type: 'String',
    description: 'The feedback comment for the review.',
  },
  reviewer: {
    type: 'userInfo!',
    description: 'Reviewer infomation for the ticket review.',
  },
  agent: {
    type: 'userInfo!',
    description: 'Agent information for the ticket review.',
  },
});

const ticketReview = ticketReviewSchema.getSchemaString();
export default ticketReview;
