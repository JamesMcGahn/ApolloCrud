import { gql } from '@apollo/client';

const getTicket = gql`
  query Tickets($ticketId: ID!) {
    ticket(id: $ticketId) {
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

export default getTicket;
