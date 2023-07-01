import { gql } from '@apollo/client';

const updateAUserGroup = gql`
  mutation UpdateUserGroups($updateUserGroups: updateUserGroups!) {
    updateUserGroups(updateUserGroups: $updateUserGroups) {
      id
      groups {
        name
        id
      }
    }
  }
`;

export default updateAUserGroup;
