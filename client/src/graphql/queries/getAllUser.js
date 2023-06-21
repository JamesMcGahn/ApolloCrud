import { gql } from '@apollo/client';

const getAllUsers = gql`
  query Users {
    users {
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

export default getAllUsers;
