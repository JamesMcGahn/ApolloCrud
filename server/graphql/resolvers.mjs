import dateScalar from './scalars/dateScalar.mjs';
import {
  getTickets,
  bulkUpdateTickets,
  myTickets,
} from './resolvers/ticketsResolvers.mjs';
import {
  getTicket,
  createTicket,
  updateATicket,
  deleteTicket,
} from './resolvers/ticketResolvers.mjs';
import { loginUser, signOut, currentUser } from './resolvers/authResolvers.mjs';
import { createAUser } from './resolvers/userResolver.mjs';
import { getUsers } from './resolvers/usersResolvers.mjs';

const resolvers = {
  Query: {
    tickets: getTickets,
    ticket: getTicket,
    myTickets: myTickets,
    users: getUsers,
    currentUser: currentUser,
  },
  Mutation: {
    createTicket: createTicket,
    updateTicket: updateATicket,
    updateTickets: bulkUpdateTickets,
    deleteTicket: deleteTicket,
    createUser: createAUser,
    loginUser: loginUser,
    signOut: signOut,
  },
  Date: dateScalar,
};

export default resolvers;
