import { GraphQLError } from 'graphql';
import Ticket from '../../models/Ticket.mjs';
import Comment from '../../models/Comment.mjs';
import Company from '../../models/Company.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getTickets = async (parent, args, context) => {
  const { status, companyId } = args;
  const { user } = context;

  protectRoute(
    context,
    [],
    (companyId && user.role === 'user' && user.company.id !== companyId) ||
      (!companyId && user.role === 'user'),
    'You dont have permission to view these tickets.',
  );
  const ticket = Ticket.find();

  if (companyId) {
    const company = await Company.findById(companyId);
    const usersIds = company.users;

    ticket.find({ requester: { $in: usersIds } });
  }

  if (status) {
    ticket.find({ status: { $in: status } });
  }

  if (user.role === 'user') {
    const tickets = await ticket;
    const filtPrivTickets = tickets.map((tix) => {
      const noPrivComms = tix.comments.filter((comm) => comm.private !== true);
      return {
        ...tix._doc,
        comments: noPrivComms,
      };
    });
    return filtPrivTickets;
  }

  return await ticket;
};

const bulkUpdateTickets = async (_, args, context) => {
  const { ids, updateTickets } = args;
  const { user } = context;
  let ticket;
  let userCheck = false;

  const checkTickets = await Ticket.find({ _id: { $in: ids } });
  checkTickets.forEach((tix) => {
    if (user.role === 'user' && tix.requester.id !== user.id) {
      userCheck = true;
    }
  });

  protectRoute(
    context,
    [],
    userCheck,
    'You dont have permission to update these tickets.',
  );

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
    if (user.role === 'user') {
      const tickets = await Ticket.find({ _id: { $in: ids } });
      const filtPrivTickets = tickets.map((tix) => {
        const noPrivComms = tix.comments.filter(
          (comm) => comm.private !== true,
        );
        return {
          ...tix._doc,
          comments: noPrivComms,
        };
      });

      return filtPrivTickets;
    }
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

const myTickets = async (_, args, context) => {
  const { user } = context;
  const { userId, status } = args;

  protectRoute(
    context,
    [],
    user.id !== userId,
    'You dont have permission to view other tickets.',
  );

  const tickets = Ticket.find({
    $or: [{ assignee: userId }, { requester: userId }],
  });

  if (status && !status.includes(null)) {
    return await tickets.find({ status: { $in: status } });
  }
  return await tickets;
};

export { getTickets, bulkUpdateTickets, myTickets };
