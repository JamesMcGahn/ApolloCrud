import { gql } from '@apollo/client';

const getUserGroups = gql`
  query UserGroups($userGroupsId: ID!) {
    userGroups(id: $userGroupsId) {
      groups {
        id
        name
      }
      id
      name
    }
  }
`;

export default getUserGroups;
