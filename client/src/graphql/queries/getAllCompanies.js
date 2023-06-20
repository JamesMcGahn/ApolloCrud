import { gql } from '@apollo/client';

const getAllCompanies = gql`
  query Query {
    companies {
      id
      level
      name
    }
  }
`;

export default getAllCompanies;
