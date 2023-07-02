import { gql } from '@apollo/client';

const getMyTickets = gql`
  query MyTickets($userId: ID!, $status: [statusType]) {
    myTickets(userId: $userId, status: $status) {
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
      priority
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
