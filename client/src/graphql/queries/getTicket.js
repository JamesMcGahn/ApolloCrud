import { gql } from '@apollo/client';

const getTicket = gql`
  query Tickets($ticketId: ID!) {
    ticket(id: $ticketId) {
      group {
        id
        name
      }
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
      priority
      title
      updatedAt
      channel
    }
  }
`;

export default getTicket;
