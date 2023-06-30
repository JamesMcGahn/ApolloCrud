import { gql } from '@apollo/client';

const getAGroup = gql`
  query Group($groupId: ID!) {
    group(id: $groupId) {
      id
      name
      users {
        name
        role
        isActive
        email
        id
      }
    }
  }
`;

export default getAGroup;
