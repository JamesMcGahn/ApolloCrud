import { gql } from '@apollo/client';

const deleteATicket = gql`
  mutation Mutation($deleteTicketId: ID!) {
    deleteTicket(id: $deleteTicketId) {
      id
    }
  }
`;

export default deleteATicket;
