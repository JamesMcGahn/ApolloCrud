import { gql } from '@apollo/client';

const updateTickets = gql`
  mutation UpdateTickets($updateTickets: updateTicket, $ids: [ID!]) {
    updateTickets(updateTickets: $updateTickets, ids: $ids) {
      assignee {
        email
        name
        id
        role
      }
      comments {
        author {
          id
          name
          email
          role
        }
        content
        createdAt
        updatedAt
        id
      }
      createdAt
      description
      id
      requester {
        email
        id
        name
        role
      }
      status
      title
      updatedAt
    }
  }
`;

export default updateTickets;
