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
import {
  createAUser,
  updateAUser,
  getUser,
} from './resolvers/userResolver.mjs';
import { getUsers } from './resolvers/usersResolvers.mjs';
import {
  createCompany,
  updateACompany,
} from './resolvers/companyResolvers.mjs';
import { getAllCompanies } from './resolvers/companiesResolvers.mjs';

const resolvers = {
  Query: {
    tickets: getTickets,
    ticket: getTicket,
    myTickets: myTickets,
    users: getUsers,
    user: getUser,
    currentUser: currentUser,
    companies: getAllCompanies,
  },
  Mutation: {
    createTicket: createTicket,
    updateTicket: updateATicket,
    updateTickets: bulkUpdateTickets,
    deleteTicket: deleteTicket,
    createUser: createAUser,
    updateUser: updateAUser,
    createCompany: createCompany,
    updateCompany: updateACompany,
    loginUser: loginUser,
    signOut: signOut,
  },
  Date: dateScalar,
};

export default resolvers;
