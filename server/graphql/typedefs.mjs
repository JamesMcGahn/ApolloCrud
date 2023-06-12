const typeDefs = `#graphQL
  scalar Date

   type Ticket {
    id: ID!
    title: String!
    description: String!
    updatedAt: Date
    createdAt: Date
    status: StatusType
  }

  enum StatusType {
    New
    Open
    Blocked
    Closed
  }

  input newTicket {
    title: String!
    description: String!
  }

  input updateTicket {
    title: String
    description: String
    status: StatusType
  }

  input createUser {
    name: String!
    email: String!
    password: String!
    passwordConfirm: String!
  }

  input loginUser {
    email: String!
    password: String!
  }

  type user {
    name: String!
    email: String!
    role: String!
    token: String
  }

  type Query {
    Tickets: [Ticket!]
    Ticket(id: ID!): Ticket!
  }

  type Mutation {
    createTicket(newTicket: newTicket): Ticket!
    updateTicket(id: ID!, updateTicket: updateTicket): Ticket!
    deleteTicket(id: ID!): Ticket!
    createUser(createUser: createUser!): user!
    loginUser(loginUser: loginUser!): user!
  }
`;

export default typeDefs;
