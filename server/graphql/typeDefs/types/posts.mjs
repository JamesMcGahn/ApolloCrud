import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const postsSchema = new TEISchemaGenerator('posts', 'type', {
  posts: {
    type: '[post]',
    description: 'The arry of the posts',
  },
  totalDocs: {
    type: 'Int!',
    description: 'The total number of posts.',
  },
  limit: {
    type: 'Int!',
    description: 'The limit of total posts.',
  },
  page: {
    type: 'Int!',
    description: 'The offset of total posts.',
  },
  hasPrevPage: {
    type: 'Boolean!',
    description: 'Is there a previous page.',
  },
  hasNextPage: {
    type: 'Boolean!',
    description: 'Is there a next page.',
  },
  prevPage: {
    type: 'Int',
    description: 'The previous page.',
  },
  nextPage: {
    type: 'Int',
    description: 'The next page.',
  },
});

const posts = postsSchema.getSchemaString();
export default posts;
