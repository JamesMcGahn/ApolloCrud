import enums from './typeDefs/enum/index.mjs';
import types from './typeDefs/types/index.mjs';
import inputs from './typeDefs/inputs/index.mjs';
import queries from './typeDefs/queries/index.mjs';

const typeDefs = `#graphQL
  scalar Date

  ${enums}
  ${types}
  ${inputs}
  ${queries}

  type Mutation {
    createTicket(newTicket: newTicket): ticket!
    updateTicket(id: ID!, updateTicket: updateTicket): ticket!
    updateTickets(ids: [ID!], updateTickets: updateTicket): [ticket!]
    deleteTicket(id: ID!): ticket!
    deleteTickets(id: [ID!]): [ID]
    createUser(createUser: createUser!, agentCreated: Boolean!): user!
    updateUser(id: ID!, updateUser: updateUser!):user!
    updateUserGroups(updateUserGroups: updateUserGroups!): userGroupInfo!
    createCompany(newCompany: newCompany!): company!
    updateCompany(id: ID!, updateCompany: updateCompany!): company!
    deleteCompany(id: ID!): company!
    createGroup(groupName: String): agentGroup!
    updateGroup(updateGroup: updateGroup): agentGroup!
    createTicketReview(newTicketReview: newTicketReview!): ticketReview!
    loginUser(loginUser: loginUser!): user!
    forgotPassword(email: String!): Boolean!
    resetPassword(resetPassword: resetPassword!): Boolean!
    signOut: Boolean!
  }
`;

export default typeDefs;
