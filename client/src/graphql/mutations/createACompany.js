import { gql } from '@apollo/client';

const createACompany = gql`
  mutation CreateCompany($newCompany: newCompany!) {
    createCompany(newCompany: $newCompany) {
      domain
      level
      name
      notes
      id
    }
  }
`;

export default createACompany;
