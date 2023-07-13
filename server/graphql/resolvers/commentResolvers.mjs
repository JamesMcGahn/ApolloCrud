import Comment from '../../models/Comment.mjs';
import Ticket from '../../models/Ticket.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const ticketCommentInt = async (parent, args, context) => {
  const { id, ticketId } = args;
  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to change comments.',
  );

  const comm = await Comment.findByIdAndUpdate(id, { private: true });

  if (ticketId) {
    await Ticket.findByIdAndUpdate(ticketId, {
      updaterName: context.user.name,
      updaterId: context.user.id,
      comment: {
        commentId: comm.id,
        content: `Comment was changed to internal note: ${comm.content}`,
        private: true,
      },
    });
  }

  return true;
};

// trunk-ignore(eslint/import/prefer-default-export)
export { ticketCommentInt };
