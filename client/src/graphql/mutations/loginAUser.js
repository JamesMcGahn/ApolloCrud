import { gql } from '@apollo/client';

const loginAUser = gql`
  mutation loginUser($loginUser: loginUser!) {
    loginUser(loginUser: $loginUser) {
      id
      email
      name
      role
      token
    }
  }
`;

export default loginAUser;
