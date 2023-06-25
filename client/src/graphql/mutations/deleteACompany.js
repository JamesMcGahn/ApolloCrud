import { gql } from '@apollo/client';

const deleteACompany = gql`
  mutation DeleteCompany($deleteCompanyId: ID!) {
    deleteCompany(id: $deleteCompanyId) {
      id
    }
  }
`;

export default deleteACompany;
