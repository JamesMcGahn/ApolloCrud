import { gql } from '@apollo/client';

const updateAUser = gql`
  mutation UpdateUser($updateUserId: ID!, $updateUser: updateUser!) {
    updateUser(id: $updateUserId, updateUser: $updateUser) {
      company {
        id
        name
      }
      email
      id
      name
      role
      isActive
    }
  }
`;

export default updateAUser;
