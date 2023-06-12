import { GraphQLError } from 'graphql';
import dateScalar from './scalars/dateScalar.mjs';
import Ticket from '../models/Ticket.mjs';

const resolvers = {
  Query: {
    Tickets: async () => {
      return await Ticket.find();
    },
    Ticket: async (_, args) => {
      const { id } = args;
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw new GraphQLError('We cannot find that Ticket Id', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return ticket;
    },
  },
  Mutation: {
    createTicket: async (_, args) => {
      const { newTicket } = args;
      const ticket = await Ticket.create(newTicket);

      return ticket;
    },
    updateTicket: async (_, args) => {
      const { id, updateTicket } = args;

      const ticket = await Ticket.findByIdAndUpdate(id, updateTicket, {
        new: true,
        runValidators: true,
      });
      return ticket;
    },
  },
  Date: dateScalar,
};

export default resolvers;
