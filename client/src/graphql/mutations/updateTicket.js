import { gql } from '@apollo/client';

const updateTicket = gql`
  mutation UpdateTicket($updateTicketId: ID!, $updateTicket: updateTicket) {
    updateTicket(id: $updateTicketId, updateTicket: $updateTicket) {
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
      title
      priority
      channel
      updatedAt
      history {
        id
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
          commentId
          author
          content
          private
        }
      }
    }
  }
`;

export default updateTicket;
