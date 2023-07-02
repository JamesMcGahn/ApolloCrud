import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const newTicketReviewSchema = new TEISchemaGenerator(
  'newTicketReview',
  'input',
  {
    ticket: {
      type: 'ID!',
      description: 'The ID of the ticket.',
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
      type: 'ID!',
      description: 'Reviewer ID for the ticket review.',
    },
    agent: {
      type: 'ID!',
      description: 'Agent ID for the ticket review.',
    },
  },
);

const newTicketReview = newTicketReviewSchema.getSchemaString();
export default newTicketReview;
