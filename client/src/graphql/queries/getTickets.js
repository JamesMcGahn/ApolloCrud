import { gql } from '@apollo/client';

const getTickets = gql`
  query Tickets($status: [StatusType], $companyId: ID) {
    tickets(status: $status, companyId: $companyId) {
      id
      requester {
        email
        id
        name
        role
        company {
          name
          id
        }
      }
      status
      priority
      title
      updatedAt
      description
      createdAt
      assignee {
        email
        id
        name
        role
        company {
          name
          id
        }
      }
    }
  }
`;

export default getTickets;
