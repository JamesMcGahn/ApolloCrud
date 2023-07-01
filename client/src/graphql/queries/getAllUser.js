import { gql } from '@apollo/client';

const getAllUsers = gql`
  query Users($roles: [RolesType]) {
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
