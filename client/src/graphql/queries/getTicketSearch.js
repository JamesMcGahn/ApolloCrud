import { gql } from '@apollo/client';

const getTicketSearch = gql`
  query Tickets($search: String!) {
    ticketsSearch(search: $search) {
      id
      channel
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

export default getTicketSearch;
