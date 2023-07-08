import { gql } from '@apollo/client';

const getTickets = gql`
  query Tickets(
    $status: [statusType]
    $companyId: ID
    $groupId: ID
    $unassigned: Boolean
  ) {
    tickets(
      status: $status
      companyId: $companyId
      groupId: $groupId
      unassigned: $unassigned
    ) {
      id
      channel
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
  }
`;

export default getTickets;
