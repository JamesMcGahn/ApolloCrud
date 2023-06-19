import { GraphQLError } from 'graphql';
import Ticket from '../../models/Ticket.mjs';
import Comment from '../../models/Comment.mjs';
import Counter from '../../models/Counter.mjs';

const getTicket = async (parent, args) => {
  const { id } = args;
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new GraphQLError('We cannot find that Ticket Id', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return ticket;
};

const createTicket = async (_, args) => {
  const { newTicket } = args;
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

const updateATicket = async (_, args) => {
  const { id, updateTicket } = args;

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
  } else {
    ticket = await Ticket.findByIdAndUpdate(id, updateTicket, {
      new: true,
      runValidators: true,
    });
  }

  return ticket;
};

const deleteTicket = async (_, args, context) => {
  const { id } = args;
  const { user } = context;
  if (!user || user.role === 'user') {
    throw new GraphQLError('You dont have permission to delete', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }

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
