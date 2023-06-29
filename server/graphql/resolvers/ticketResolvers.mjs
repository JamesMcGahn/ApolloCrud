import { GraphQLError } from 'graphql';
import Ticket from '../../models/Ticket.mjs';
import Comment from '../../models/Comment.mjs';
import Counter from '../../models/Counter.mjs';
import sendEmail from '../../utils/sendEmail.mjs';
import emailTicket from '../../templates/emails/emailTicket.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getTicket = async (parent, args, context) => {
  const { id } = args;
  protectRoute(context, [], false);
  const ticket = await Ticket.findById(id);

  if (context.user.role === 'user') {
    const noPrivateComms = ticket.comments.filter(
      (comment) => comment.private !== true,
    );

    return {
      ...ticket._doc,
      id: ticket._doc._id,
      comments: noPrivateComms,
    };
  }

  if (!ticket) {
    throw new GraphQLError('We cannot find that Ticket Id', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return ticket;
};

const createTicket = async (_, args, context) => {
  const { newTicket } = args;
  protectRoute(context, [], false);

  const counter = await Counter.findOneAndUpdate(
    { id: 'ticketCounter' },
    { $inc: { count: 1 } },
    { new: true },
  );
  let ticket;
  if (newTicket.comment) {
    const comment = await Comment.create(newTicket.comment);
    ticket = await Ticket.create({
      _id: `${counter.count}`,
      ...newTicket,
      comments: [comment._id],
    });
  } else {
    ticket = await Ticket.create({
      _id: `${counter.count}`,
      ...newTicket,
    });
  }

  return await Ticket.findById(ticket.id);
};

const updateATicket = async (_, args, context) => {
  const { id, updateTicket } = args;
  const { user } = context;
  protectRoute(
    context,
    [],
    user.role === 'user' && (updateTicket?.assignee || updateTicket?.requester),
    "You don't have permission to update these fields.",
  );

  let ticket;
  if (updateTicket.comment) {
    const comment = await Comment.create(updateTicket.comment);
    ticket = await Ticket.findByIdAndUpdate(
      id,
      { ...updateTicket, $push: { comments: comment._id } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (comment.private === false && ticket.channel === 'email') {
      try {
        const tix = await ticket.populate('comments');
        const tixComments = tix.comments.filter((c) => c.private === false);

        const html = emailTicket(tix, tixComments);

        await sendEmail({
          email: tix.requester.email,
          subject: `${tix.title} [Ticket:${tix.id}]`,
          html,
        });
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    ticket = await Ticket.findByIdAndUpdate(id, updateTicket, {
      new: true,
      runValidators: true,
    });
  }

  if (context.user.role === 'user') {
    const noPrivateComms = ticket.comments.filter(
      (comment) => comment.private !== true,
    );
    return {
      ...ticket._doc,
      id: ticket._doc._id,
      comments: noPrivateComms,
    };
  }

  return ticket;
};

const deleteTicket = async (_, args, context) => {
  const { id } = args;

  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to delete a ticket.',
  );

  const ticket = Ticket.findByIdAndRemove(id);
  if (!ticket) {
    throw new GraphQLError('We cannot find that Ticket Id', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return ticket;
};
export { getTicket, createTicket, updateATicket, deleteTicket };
