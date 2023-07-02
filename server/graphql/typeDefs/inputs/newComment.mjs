import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const newCommentSchema = new TEISchemaGenerator('newComment', 'input', {
  author: {
    type: 'ID!',
    description: 'The ID of the author writing the comment.',
  },
  content: {
    type: 'String!',
    description: 'The content of the comment.',
  },
  private: {
    type: 'Boolean',
    description: 'Is the comment and internal note.',
  },
});

const newComment = newCommentSchema.getSchemaString();
export default newComment;
