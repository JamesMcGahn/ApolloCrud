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
    priority: PriorityType
    status: StatusType
    comments: [Comment!]
  }

  enum PriorityType {
    Low
    Normal
    High
    Urgent
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
    isActive: Boolean!
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
    priority: PriorityType
  }

  input updateTicket {
    assignee: ID
    requester: ID
    title: String
    description: String
    status: StatusType
    comment: newComment
    priority: PriorityType
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
    company: ID
    role: RolesType
    isActive: Boolean
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
    isActive: Boolean!
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
    domain: String
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
    domain: String
  }

  input updateCompany {
    name: String
    users: [ID]
    domain: String
    notes: String
    level: ServiceLevelType
  }

  type Query {
    tickets(status: [StatusType], companyId: ID): [Ticket!]
    ticket(id: ID!): Ticket!
    myTickets(userId: ID!, status: [StatusType]): [Ticket!]
    users: [userInfo!]
    user(id: ID!): userInfo!
    companies: [companyInfo!]
    company(id: ID!): company!
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
    deleteCompany(id: ID!): company!
    loginUser(loginUser: loginUser!): user!
    signOut: Boolean!
  }
`;

export default typeDefs;
