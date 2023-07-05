import dateScalar from './scalars/dateScalar.mjs';
import {
  getTickets,
  bulkUpdateTickets,
  myTickets,
  ticketsSearch,
  bulkDeleteTickets,
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
  updateUserGroups,
  getUserGroup,
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
import {
  createGroup,
  updateAGroup,
  getGroup,
} from './resolvers/groupResolvers.mjs';
import { getAllGroups } from './resolvers/groupsResolvers.mjs';
import {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} from './resolvers/blogResolver.mjs';
import { getBlogs } from './resolvers/blogsResolver.mjs';

const resolvers = {
  Query: {
    tickets: getTickets,
    ticket: getTicket,
    ticketsSearch: ticketsSearch,
    myTickets: myTickets,
    users: getUsers,
    user: getUser,
    userGroups: getUserGroup,
    currentUser: currentUser,
    companies: getAllCompanies,
    group: getGroup,
    groups: getAllGroups,
    company: getCompany,
    ticketReview: getTicketReview,
    blog: getBlog,
    blogs: getBlogs,
  },
  Mutation: {
    createTicket: createTicket,
    updateTicket: updateATicket,
    updateTickets: bulkUpdateTickets,
    deleteTickets: bulkDeleteTickets,
    deleteTicket: deleteTicket,
    createUser: createAUser,
    updateUser: updateAUser,
    updateUserGroups: updateUserGroups,
    createCompany: createCompany,
    updateCompany: updateACompany,
    deleteCompany: deleteACompany,
    createGroup: createGroup,
    updateGroup: updateAGroup,
    createTicketReview: createTicketReview,
    loginUser: loginUser,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    signOut: signOut,
    createBlog: createBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
  },
  Date: dateScalar,
};

export default resolvers;
