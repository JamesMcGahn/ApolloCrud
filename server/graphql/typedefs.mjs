const typeDefs = `#graphQL
  scalar Date

   type Ticket {
    id: ID!
    assignee: userInfo
    requester: userInfo
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
    Pending
    Blocked
    Closed
  }

  enum RolesType {
    user
    agent
    lead
    admin
  }

  type userInfo {
    id: ID!
    company: userCompany
    name: String!
    email: String!
    role: RolesType!
  }

  type Comment {
    id: ID!
    author: userInfo!
    content: String!
    private: Boolean
    updatedAt: Date
    createdAt: Date
  }

  input newComment {
    author: ID!
    content: String!
    private: Boolean
  }

  input newTicket {
    assignee: ID
    requester: ID!
    title: String!
    description: String!
    status: StatusType
    comment: newComment
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
 input updateUser {
    name: String
    email: String
    role: RolesType
  }
   input updateUser {
    name: String
    email: String
    company: ID
  }

  input loginUser {
    email: String!
    password: String!
  }

  type userCompany {
    id: ID!
    name: String!
  }

  type user {
    id: ID!
    company: userCompany
    name: String!
    email: String!
    role: RolesType!
    token: String
  }

  enum ServiceLevelType {
      Small
      Medium
      Large
      Enterprise
    }


  type company {
    id: ID!
    name: String!
    users: [userInfo]
    notes: String
    level: ServiceLevelType
  }

  type companyInfo {
    id: ID!
    name: String!
    notes: String
    level: ServiceLevelType
  }

  input newCompany {
    name: String!
    users: [ID]
    notes: String
    level: ServiceLevelType
  }

  input updateCompany {
    name: String
    users: [ID]
    notes: String
    level: ServiceLevelType
  }

  type Query {
    tickets(status: [StatusType]): [Ticket!]
    ticket(id: ID!): Ticket!
    myTickets(userId: ID!, status: [StatusType]): [Ticket!]
    users: [userInfo!]
    companies: [companyInfo!]
    currentUser: userInfo!
  }

  type Mutation {
    createTicket(newTicket: newTicket): Ticket!
    updateTicket(id: ID!, updateTicket: updateTicket): Ticket!
    updateTickets(ids: [ID!], updateTickets: updateTicket): [Ticket!]
    deleteTicket(id: ID!): Ticket!
    createUser(createUser: createUser!): user!
    updateUser(id: ID!, updateUser: updateUser!):user!
    createCompany(newCompany: newCompany!): company!
    updateCompany(id: ID!, updateCompany: updateCompany!): company!
    loginUser(loginUser: loginUser!): user!
    signOut: Boolean!
  }
`;

export default typeDefs;
