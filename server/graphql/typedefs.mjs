const typeDefs = `#graphQL
  scalar Date

  type Query {
    Tickets: [Ticket!]
  }

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

  type Mutation {
    createTicket(newTicket: newTicket): Ticket!
  }
`;

export default typeDefs;
