import { gql } from '@apollo/client';

const getAllGroups = gql`
  query Group {
    groups {
      name
      users {
        id
        email
        name
      }
      id
    }
  }
`;

export default getAllGroups;
