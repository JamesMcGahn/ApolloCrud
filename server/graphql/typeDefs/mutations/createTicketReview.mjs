import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const createTicketReviewSchema = new QMSchemaGenerator(
  'createTicketReview',
  {
    newTicketReview: {
      type: 'newTicketReview!',
      description: 'Object of new ticket review information.',
    },
  },
  {
    type: 'ticketReview!',
    description: 'The created ticket review.',
  },
);

const createTicketReview = createTicketReviewSchema.getSchemaString();

export default createTicketReview;
