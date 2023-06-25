import { gql } from '@apollo/client';

const registerAUser = gql`
  mutation CreateUser($createUser: createUser!, $agentCreated: Boolean!) {
    createUser(createUser: $createUser, agentCreated: $agentCreated) {
      email
      id
      name
      role
      token
    }
  }
`;

export default registerAUser;
