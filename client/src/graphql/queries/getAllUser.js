import { gql } from '@apollo/client';

const getAllUsers = gql`
  query Users {
    users {
      email
      id
      name
      role
    }
  }
`;

export default getAllUsers;
