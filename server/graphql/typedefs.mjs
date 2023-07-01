const typeDefs = `#graphQL
  scalar Date

   type Ticket {
    id: ID!
    group: AgentGroup
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
    Solved
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
    group: ID
    requester: ID!
    title: String!
    description: String!
    status: StatusType
    comment: newComment
    priority: PriorityType
  }

  input updateTicket {
    assignee: ID
    group: ID
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

  input resetPassword {
    password: String!
    passwordConfirm: String!
    token: String!
  }

  type ticketReview {
    ticket: ID!
    rating: Int!
    comment: String
    reviewer: userInfo!
    agent: userInfo!
  }

  input newTicketReview {
    ticket: ID!
    rating: Int!
    comment: String
    reviewer: ID!
    agent: ID!
  }

  type AgentGroup {
    id: ID!
    name: String!
    users: [userInfo]
  }

  type groupInfo {
    id: ID!
    name: String!
  }

  input addGroup {
    name: String!
  }

  input updateGroup {
    id: ID!
    name: String
    users: [ID]
  }

  input updateUserGroups {
    userId: ID!,
    groups: [ID!]
  }

  type userGroupInfo {
    id: ID!
    name: String
    groups: [groupInfo]
  }

  type Query {
    tickets(status: [StatusType], companyId: ID): [Ticket!]
    ticket(id: ID!): Ticket!
    ticketsSearch(search: String!): [Ticket]
    myTickets(userId: ID!, status: [StatusType]): [Ticket!]
    users(roles: [RolesType]): [userInfo!]
    user(id: ID!): userInfo!
    userGroups(id: ID!): userGroupInfo
    group(id: ID!): AgentGroup!
    groups:[AgentGroup!]
    companies: [companyInfo!]
    company(id: ID!): company!
    ticketReview(ticket: ID!): ticketReview!
    currentUser: userInfo!
  }

  type Mutation {
    createTicket(newTicket: newTicket): Ticket!
    updateTicket(id: ID!, updateTicket: updateTicket): Ticket!
    updateTickets(ids: [ID!], updateTickets: updateTicket): [Ticket!]
    deleteTicket(id: ID!): Ticket!
    deleteTickets(id: [ID!]): [ID]
    createUser(createUser: createUser!, agentCreated: Boolean!): user!
    updateUser(id: ID!, updateUser: updateUser!):user!
    updateUserGroups(updateUserGroups: updateUserGroups!): userGroupInfo!
    createCompany(newCompany: newCompany!): company!
    updateCompany(id: ID!, updateCompany: updateCompany!): company!
    deleteCompany(id: ID!): company!
    createGroup(groupName: String): AgentGroup!
    updateGroup(updateGroup: updateGroup): AgentGroup!
    createTicketReview(newTicketReview: newTicketReview!): ticketReview
    loginUser(loginUser: loginUser!): user!
    forgotPassword(email: String!): Boolean!
    resetPassword(resetPassword: resetPassword!): Boolean!
    signOut: Boolean!
  }
`;

export default typeDefs;
