import { gql } from '@apollo/client';

const updateACompany = gql`
  mutation Mutation($updateCompanyId: ID!, $updateCompany: updateCompany!) {
    updateCompany(id: $updateCompanyId, updateCompany: $updateCompany) {
      domain
      id
      level
      name
      notes
      users {
        company {
          id
          name
        }
        email
        id
        isActive
        name
        role
      }
    }
  }
`;

export default updateACompany;
