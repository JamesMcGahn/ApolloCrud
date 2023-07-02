import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const ticketReviewSchema = new QMSchemaGenerator(
  'ticketReview',
  {
    ticket: {
      type: 'ID',
      description: 'The ID of the ticket.',
    },
  },
  {
    type: 'ticketReview!',
    description: "The ticket's review information",
  },
);

const ticketReview = ticketReviewSchema.getSchemaString();

export default ticketReview;
