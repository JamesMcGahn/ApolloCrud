import createTicket from './createTicket.mjs';
import updateTicket from './updateTicket.mjs';
import updateTickets from './updateTickets.mjs';
import deleteTicket from './deleteTicket.mjs';
import deleteTickets from './deleteTickets.mjs';
import mergeTickets from './mergeTickets.mjs';
import createUser from './createUser.mjs';
import updateUser from './updateUser.mjs';
import updateUserGroups from './updateUserGroups.mjs';
import createCompany from './createCompany.mjs';
import updateCompany from './updateCompany.mjs';
import deleteCompany from './deleteCompany.mjs';
import createGroup from './createGroup.mjs';
import updateGroup from './updateGroup.mjs';
import createTicketReview from './createTicketReview.mjs';
import loginUser from './loginUser.mjs';
import forgotPassword from './forgotPassword.mjs';
import resetPassword from './resetPassword.mjs';
import signOut from './signOut.mjs';
import createBlog from './createBlog.mjs';
import updateBlog from './updateBlog.mjs';
import deleteBlog from './deleteBlog.mjs';
import createArticle from './createArticle.mjs';
import updateArticle from './updateArticle.mjs';
import deleteArticle from './deleteArticle.mjs';
import ticketCommentInt from './ticketCommentInt.mjs';

const ticketMutations = ''.concat(
  createTicket,
  updateTicket,
  updateTickets,
  deleteTicket,
  deleteTickets,
  mergeTickets,
);

const userMutations = ''.concat(createUser, updateUser, updateUserGroups);
const companyMutations = ''.concat(createCompany, updateCompany, deleteCompany);
const groupMutations = ''.concat(createGroup, updateGroup);
const ticketReviewMutations = ''.concat(createTicketReview);
const authMutations = ''.concat(
  loginUser,
  forgotPassword,
  resetPassword,
  signOut,
);
const blogMutations = ''.concat(createBlog, updateBlog, deleteBlog);
const articleMutations = ''.concat(createArticle, updateArticle, deleteArticle);
const commentMutations = ''.concat(ticketCommentInt);

const mutations = 'type Mutation {'.concat(
  ticketMutations,
  userMutations,
  companyMutations,
  groupMutations,
  ticketReviewMutations,
  authMutations,
  blogMutations,
  articleMutations,
  commentMutations,
  '}',
);

export default mutations;
