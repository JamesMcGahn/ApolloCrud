import { gql } from '@apollo/client';

const getMyTickets = gql`
  query MyTickets($userId: ID!) {
    myTickets(userId: $userId) {
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

export default getMyTickets;
