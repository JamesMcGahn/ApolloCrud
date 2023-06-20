import { gql } from '@apollo/client';

const loggedInUser = gql`
  query Query {
    currentUser {
      company {
        id
        name
      }
      email
      id
      name
      role
    }
  }
`;

export default loggedInUser;
