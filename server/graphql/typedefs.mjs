const typeDefs = `#graphQL
  scalar Date

   type Ticket {
    id: ID!
    assignee: ID
    requester: ID
    title: String!
    description: String!
    updatedAt: Date
    createdAt: Date
    status: StatusType
    comments: [Comment!]
  }

  enum StatusType {
    New
    Open
    Blocked
    Closed
  }

  type userInfo {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Comment {
    id: ID!
    author: userInfo!
    content: String!
    updatedAt: Date
    createdAt: Date
  }

  input newComment {
    author: ID!
    content: String!
  }

  input newTicket {
    requester: ID!
    title: String!
    description: String!
  }

  input updateTicket {
    assignee: ID
    requester: ID
    title: String
    description: String
    status: StatusType
    comment: newComment
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
    tickets: [Ticket!]
    ticket(id: ID!): Ticket!
    myTickets(userId: ID!): [Ticket!]
    users: [userInfo!]
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
