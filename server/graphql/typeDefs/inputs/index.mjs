import newComment from './newComment.mjs';
import newTicket from './newTicket.mjs';
import updateTicket from './updateTicket.mjs';
import createUser from './createUser.mjs';
import updateUser from './updateUser.mjs';
import loginUser from './loginUser.mjs';
import newCompany from './newCompany.mjs';
import updateCompany from './updateCompany.mjs';
import newTicketReview from './newTicketReview.mjs';
import updateGroup from './updateGroup.mjs';
import updateUserGroups from './updateUserGroups.mjs';
import resetPassword from './resetPassword.mjs';

const commentInputs = ''.concat(newComment);
const ticketInputs = ''.concat(newTicket, updateTicket);
const userInputs = ''.concat(
  createUser,
  updateUser,
  loginUser,
  updateUserGroups,
  resetPassword,
);
const companyInputs = ''.concat(newCompany, updateCompany);
const ticketReviewInputs = ''.concat(newTicketReview);
const groupInputs = ''.concat(updateGroup);

const inputs = ''.concat(
  commentInputs,
  ticketInputs,
  userInputs,
  companyInputs,
  ticketReviewInputs,
  groupInputs,
);

export default inputs;
