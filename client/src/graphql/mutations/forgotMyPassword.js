import { gql } from '@apollo/client';

const forgotMyPassword = gql`
  mutation Mutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

export default forgotMyPassword;
