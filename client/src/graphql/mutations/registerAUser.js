import { gql } from '@apollo/client';

const registerAUser = gql`
  mutation Mutation($createUser: createUser!) {
    createUser(createUser: $createUser) {
      email
      id
      name
      role
      token
    }
  }
`;

export default registerAUser;
