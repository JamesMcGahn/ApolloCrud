import { gql } from '@apollo/client';

const createUpdateTicketReview = gql`
  mutation Mutation($newTicketReview: newTicketReview!) {
    createTicketReview(newTicketReview: $newTicketReview) {
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

export default createUpdateTicketReview;
