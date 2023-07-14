import tickets from './tickets.mjs';
import ticket from './ticket.mjs';
import ticketsSearch from './ticketsSearch.mjs';
import myTickets from './myTickets.mjs';
import users from './users.mjs';
import user from './user.mjs';
import userGroups from './userGroups.mjs';
import currentUser from './currentUser.mjs';
import group from './group.mjs';
import groups from './groups.mjs';
import companies from './companies.mjs';
import company from './company.mjs';
import ticketReview from './ticketReview.mjs';
import blog from './blog.mjs';
import blogs from './blogs.mjs';
import blogsCategories from './blogsCategories.mjs';
import blogSuggested from './blogSuggested.mjs';
import article from './article.mjs';
import articles from './articles.mjs';
import articlesCategories from './articlesCategories.mjs';
import articlesTags from './articlesTags.mjs';
import articleSuggested from './articleSuggested.mjs';

const ticketQueries = ''.concat(tickets, ticket, ticketsSearch, myTickets);
const userQueries = ''.concat(user, users, userGroups, currentUser);
const groupQueries = ''.concat(group, groups);
const companyQueries = ''.concat(companies, company);
const ticketReviewQueries = ''.concat(ticketReview);
const blogQueries = ''.concat(blog);
const blogsQueries = ''.concat(blogs, blogsCategories, blogSuggested);
const articleQueries = ''.concat(article);
const articlesQueries = ''.concat(
  articles,
  articlesCategories,
  articlesTags,
  articleSuggested,
);

const queries = 'type Query {'.concat(
  ticketQueries,
  userQueries,
  groupQueries,
  companyQueries,
  ticketReviewQueries,
  blogQueries,
  blogsQueries,
  articleQueries,
  articlesQueries,
  '}',
);

export default queries;
