import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const ticketHistoryCommentSchema = new TEISchemaGenerator(
  'ticketHistoryComment',
  'type',
  {
    id: {
      type: 'ID',
      description: 'The ID of the Comment.',
    },
    author: {
      type: 'ID',
      description: 'The user ID .',
    },
    content: {
      type: 'String',
      description: 'The content of the comment.',
    },
    private: {
      type: 'Boolean',
      description: 'Is the comment internal or public.',
    },
  },
);

const ticketHistoryComment = ticketHistoryCommentSchema.getSchemaString();
export default ticketHistoryComment;
