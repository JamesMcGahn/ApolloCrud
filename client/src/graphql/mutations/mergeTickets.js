import { gql } from '@apollo/client';

const mergeTickets = gql`
  mutation MergeTickets($ticket: ID!, $mergeTicket: ID!) {
    mergeTickets(ticket: $ticket, mergeTicket: $mergeTicket) {
      mergeTicket {
        id
        group {
          id
          name
        }
        assignee {
          id
          company {
            id
            name
          }
          name
          email
          role
          isActive
        }
        requester {
          id
          name
          email
          role
          isActive
        }
        title
        description
        updatedAt
        createdAt
        priority
        status
        comments {
          id
          author {
            id
            name
            email
            role
            isActive
          }
          content
          private
          updatedAt
          createdAt
        }
      }
      mergedIntoTicket {
        id
        title
        description
        updatedAt
        createdAt
        priority
        status
      }
    }
  }
`;

export default mergeTickets;
