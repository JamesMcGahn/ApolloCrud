import dateScalar from './scalars/dateScalar.mjs';
import {
  getTickets,
  bulkUpdateTickets,
  myTickets,
  ticketsSearch,
} from './resolvers/ticketsResolvers.mjs';
import {
  getTicket,
  createTicket,
  updateATicket,
  deleteTicket,
} from './resolvers/ticketResolvers.mjs';
import {
  loginUser,
  signOut,
  currentUser,
  forgotPassword,
  resetPassword,
} from './resolvers/authResolvers.mjs';
import {
  createAUser,
  updateAUser,
  getUser,
} from './resolvers/userResolver.mjs';
import { getUsers } from './resolvers/usersResolvers.mjs';
import {
  getCompany,
  createCompany,
  updateACompany,
  deleteACompany,
} from './resolvers/companyResolvers.mjs';
import { getAllCompanies } from './resolvers/companiesResolvers.mjs';
import {
  createTicketReview,
  getTicketReview,
} from './resolvers/ticketReviewResolvers.mjs';

const resolvers = {
  Query: {
    tickets: getTickets,
    ticket: getTicket,
    ticketsSearch: ticketsSearch,
    myTickets: myTickets,
    users: getUsers,
    user: getUser,
    currentUser: currentUser,
    companies: getAllCompanies,
    company: getCompany,
    ticketReview: getTicketReview,
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
    deleteCompany: deleteACompany,
    createTicketReview: createTicketReview,
    loginUser: loginUser,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    signOut: signOut,
  },
  Date: dateScalar,
};

export default resolvers;
