import userInfo from './userInfo.mjs';
import user from './user.mjs';
import ticket from './ticket.mjs';
import comment from './comment.mjs';
import userCompany from './userCompany.mjs';
import company from './company.mjs';
import companyInfo from './companyInfo.mjs';
import ticketReview from './ticketReview.mjs';
import agentGroup from './agentGroup.mjs';
import groupInfo from './groupInfo.mjs';
import userGroupInfo from './userGroupInfo.mjs';
import post from './post.mjs';
import publicUserInfo from './publicUserInfo.mjs';

const ticketTypes = ''.concat(ticket);
const commentTypes = ''.concat(comment);
const userTypes = ''.concat(user, userInfo, userGroupInfo, publicUserInfo);
const companyTypes = ''.concat(company, userCompany, companyInfo);
const ticketReviewTypes = ''.concat(ticketReview);
const groupTypes = ''.concat(agentGroup, groupInfo);
const postTypes = ''.concat(post);

const types = ''.concat(
  ticketTypes,
  commentTypes,
  userTypes,
  companyTypes,
  ticketReviewTypes,
  groupTypes,
  postTypes,
);
export default types;
