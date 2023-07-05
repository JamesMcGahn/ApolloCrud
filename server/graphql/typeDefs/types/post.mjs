import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const postSchema = new TEISchemaGenerator('post', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the Post',
  },
  title: {
    type: 'String!',
    description: 'The title  of the post.',
  },
  slug: {
    type: 'String!',
    description: 'The slug  of the post.',
  },
  featuredImage: {
    type: 'String',
    description: 'The featured image of the post.',
  },
  blurb: {
    type: 'String!',
    description: 'Short description blurb of the post',
  },
  content: {
    type: 'String!',
    description: 'The content of the post.',
  },
  category: {
    type: '[String]',
    description: 'Categories of the post.',
  },
  tags: {
    type: '[String]',
    description: 'Tags of the post.',
  },
  author: {
    type: 'publicUserInfo',
    description: "The author's infomation",
  },
  type: {
    type: 'postType!',
    description: 'The type of post. Blog or knownledge.',
  },
  isPrivate: {
    type: 'Boolean!',
    description: 'Is the post private or public',
  },
  updatedAt: {
    type: 'Date',
    description:
      'The date time that the post was last updated. Unix timestamp in milliseconds',
  },
  createdAt: {
    type: 'Date',
    description:
      'The date time that the post was created. Unix timestamp in milliseconds',
  },
});

const post = postSchema.getSchemaString();
export default post;
