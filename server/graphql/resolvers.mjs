import dateScalar from './scalars/dateScalar.mjs';
import Ticket from '../models/Ticket.mjs';

const resolvers = {
  Query: {
    Tickets: async () => {
      return await Ticket.find();
    },
  },
  Mutation: {
    createTicket: async (_, args) => {
      const { newTicket } = args;
      const ticket = await Ticket.create(newTicket);

      return ticket;
    },
  },
  Date: dateScalar,
};

export default resolvers;
