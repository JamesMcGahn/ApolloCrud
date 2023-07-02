import { gql } from '@apollo/client';

const getAllUsers = gql`
  query Users($roles: [rolesType]) {
    users(roles: $roles) {
      email
      id
      role
      isActive
      name
      company {
        id
        name
      }
    }
  }
`;

export default getAllUsers;
