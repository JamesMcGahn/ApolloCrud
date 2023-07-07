import { gql } from '@apollo/client';

const bulkDeleteTickets = gql`
  mutation DeleteTickets($deleteTicketsId: [ID!]) {
    deleteTickets(id: $deleteTicketsId)
  }
`;

export default bulkDeleteTickets;
