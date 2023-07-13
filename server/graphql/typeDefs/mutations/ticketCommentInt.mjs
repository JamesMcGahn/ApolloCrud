import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const ticketCommentIntSchema = new QMSchemaGenerator(
  'ticketCommentInt',
  {
    id: {
      type: 'ID!',
      description: 'The ID of the comment',
    },
    ticketId: {
      type: 'ID',
      description: 'Id of the ticket to update its update history',
    },
  },
  {
    type: 'Boolean!',
    description: 'Comment was updated',
  },
);

const ticketCommentInt = ticketCommentIntSchema.getSchemaString();

export default ticketCommentInt;
