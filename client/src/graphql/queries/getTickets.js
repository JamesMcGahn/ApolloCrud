import { gql } from '@apollo/client';

const getTickets = gql`
  query Tickets {
    tickets {
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
      description
      createdAt
      assignee {
        email
        id
        name
        role
      }
    }
  }
`;

export default getTickets;
