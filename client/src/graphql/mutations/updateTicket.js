import { gql } from '@apollo/client';

const updateTicket = gql`
  mutation UpdateTicket($updateTicketId: ID!, $updateTicket: updateTicket) {
    updateTicket(id: $updateTicketId, updateTicket: $updateTicket) {
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
        private
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

export default updateTicket;
