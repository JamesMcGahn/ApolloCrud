import createTicket from './createTicket.mjs';
import updateTicket from './updateTicket.mjs';
import updateTickets from './updateTickets.mjs';
import deleteTicket from './deleteTicket.mjs';
import deleteTickets from './deleteTickets.mjs';
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

const ticketMutations = ''.concat(
  createTicket,
  updateTicket,
  updateTickets,
  deleteTicket,
  deleteTickets,
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

const mutations = 'type Mutation {'.concat(
  ticketMutations,
  userMutations,
  companyMutations,
  groupMutations,
  ticketReviewMutations,
  authMutations,
  '}',
);

export default mutations;