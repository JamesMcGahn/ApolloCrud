import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const commentSchema = new TEISchemaGenerator('comment', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the Comment.',
  },
  author: {
    type: 'userInfo!',
    description: 'The user info of the author of the comment.',
  },
  content: {
    type: 'String!',
    description: 'The content of the comment.',
  },
  private: {
    type: 'Boolean',
    description: 'Is the comment internal or public.',
  },
  updatedAt: {
    type: 'Date',
    description:
      'The date time that the comment was last updated. Unix timestamp in milliseconds',
  },
  createdAt: {
    type: 'Date',
    description:
      'The date time that the comment was created. Unix timestamp in milliseconds',
  },
});

const comment = commentSchema.getSchemaString();
export default comment;
