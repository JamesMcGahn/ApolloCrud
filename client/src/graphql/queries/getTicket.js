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
      history {
        updaterName
        updaterId
        type
        group
        assignee
        requester
        title
        description
        priority
        status
        updatedAt
        comment {
          id
          author
          content
          private
        }
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
