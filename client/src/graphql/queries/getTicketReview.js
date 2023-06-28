import { gql } from '@apollo/client';

const getTicketReview = gql`
  query TicketReview($ticket: ID!) {
    ticketReview(ticket: $ticket) {
      agent {
        id
      }
      reviewer {
        id
      }
      comment
      rating
      ticket
    }
  }
`;

export default getTicketReview;
