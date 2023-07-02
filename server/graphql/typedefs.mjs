import enums from './typeDefs/enum/index.mjs';
import types from './typeDefs/types/index.mjs';
import inputs from './typeDefs/inputs/index.mjs';

const typeDefs = `#graphQL
  scalar Date

  ${enums}
  ${types}
  ${inputs}



  type Query {
    tickets(status: [statusType], companyId: ID): [ticket!]
    ticket(id: ID!): ticket!
    ticketsSearch(search: String!): [ticket]
    myTickets(userId: ID!, status: [statusType]): [ticket!]
    users(roles: [rolesType]): [userInfo!]
    user(id: ID!): userInfo!
    userGroups(id: ID!): userGroupInfo
    group(id: ID!): agentGroup!
    groups:[agentGroup!]
    companies: [companyInfo!]
    company(id: ID!): company!
    ticketReview(ticket: ID!): ticketReview!
    currentUser: userInfo!
  }

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
