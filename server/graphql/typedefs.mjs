import enums from './typeDefs/enum/index.mjs';
import types from './typeDefs/types/index.mjs';
import inputs from './typeDefs/inputs/index.mjs';
import queries from './typeDefs/queries/index.mjs';
import mutations from './typeDefs/mutations/index.mjs';

const typeDefs = `#graphQL
  scalar Date
  ${enums}
  ${types}
  ${inputs}
  ${queries}
  ${mutations}
`;

export default typeDefs;
