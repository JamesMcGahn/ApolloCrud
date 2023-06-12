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

  type Query {
    Tickets: [Ticket!]
    Ticket(id: ID!): Ticket!
  }

  type Mutation {
    createTicket(newTicket: newTicket): Ticket!
    updateTicket(id: ID!, updateTicket: updateTicket): Ticket!
  }
`;

export default typeDefs;
