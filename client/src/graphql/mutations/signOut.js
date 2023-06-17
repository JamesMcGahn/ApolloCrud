import { gql } from '@apollo/client';

const getAllUsers = gql`
  mutation Mutation {
    signOut
  }
`;

export default getAllUsers;
