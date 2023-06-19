import { GraphQLError } from 'graphql';
import Ticket from '../../models/Ticket.mjs';
import Comment from '../../models/Comment.mjs';

const getTickets = async (parent, args) => {
  const { status } = args;

  if (status) {
    return await Ticket.find({ status: { $in: status } });
  }

  return await Ticket.find();
};

const bulkUpdateTickets = async (_, args) => {
  const { ids, updateTickets } = args;
  let ticket;
  Ticket.updateMany({ _id: { $in: ids } }, updateTickets);

  if (updateTickets.comment) {
    const comment = await Comment.create(updateTickets.comment);
    ticket = await Ticket.updateMany(
      { _id: { $in: ids } },
      { ...updateTickets, $push: { comments: comment._id } },
      {
        new: true,
        runValidators: true,
      },
    );
  } else {
    ticket = await Ticket.updateMany({ _id: { $in: ids } }, updateTickets, {
      new: true,
      runValidators: true,
    });
  }
  if (ticket.acknowledged) {
    return await Ticket.find({ _id: { $in: ids } });
  }
  throw new GraphQLError(
    "Something went wrong we couldn't update the Tickets.",
    {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    },
  );
};

const myTickets = async (_, args) => {
  const { userId, status } = args;
  const tickets = Ticket.find({
    $or: [{ assignee: userId }, { requester: userId }],
  });

  if (status && !status.includes(null)) {
    return await tickets.find({ status: { $in: status } });
  }
  return await tickets;
};

export { getTickets, bulkUpdateTickets, myTickets };
