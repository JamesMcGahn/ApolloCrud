import { gql } from '@apollo/client';

const loggedInUser = gql`
  query Query {
    currentUser {
      email
      id
      role
      name
    }
  }
`;

export default loggedInUser;
