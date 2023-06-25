import { gql } from '@apollo/client';

const resetMyPassword = gql`
  mutation ResetPassword($resetPassword: resetPassword!) {
    resetPassword(resetPassword: $resetPassword)
  }
`;

export default resetMyPassword;
