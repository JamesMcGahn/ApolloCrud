import { gql } from '@apollo/client';

const getUser = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      company {
        id
        name
      }
      email
      name
      id
      role
    }
  }
`;

export default getUser;
