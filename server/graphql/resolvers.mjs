import { GraphQLError } from 'graphql';
import dateScalar from './scalars/dateScalar.mjs';
import Ticket from '../models/Ticket.mjs';
import Comment from '../models/Comment.mjs';
import User from '../models/User.mjs';
import signToken from '../utils/signToken.mjs';
import Counter from '../models/Counter.mjs';

const resolvers = {
  Query: {
    tickets: async (parent, args) => {
      const { status } = args;

      if (status) {
        return await Ticket.find({ status: { $in: status } });
      }

      return await Ticket.find();
    },
    ticket: async (parent, args) => {
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
    },
    myTickets: async (_, args) => {
      const { userId, status } = args;
      const tickets = Ticket.find({
        $or: [{ assignee: userId }, { requester: userId }],
      });

      if (status && !status.includes(null)) {
        return await tickets.find({ status: { $in: status } });
      }
      return await tickets;
    },
    users: async (_, args, context) => {
      const { user } = context;
      if (!user || user.role === 'user') {
        throw new GraphQLError('You dont have permission to view', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      return await User.find();
    },
    currentUser: async (_, args, context) => {
      const { user } = context;
      if (!user) {
        throw new GraphQLError('You dont have permission to view', {
          extensions: {
            code: 'Not Logged In',
            http: { status: 200 },
          },
        });
      }
      return user;
    },
    signOut: (_, args, context) => {
      context.res.cookie('jwt', 'expired', {
        expires: new Date(Date.now() + 10 * 1000),
        http: true,
      });

      return true;
    },
  },
  Mutation: {
    createTicket: async (_, args) => {
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
    },
    updateTicket: async (_, args) => {
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
    },
    updateTickets: async (_, args) => {
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
    },
    deleteTicket: async (_, args, context) => {
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
    },
    createUser: async (_, args) => {
      const { createUser } = args;
      const newUser = await User.create(createUser);

      const createdUser = {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        email: newUser.email,
      };

      const token = signToken(createdUser);

      return {
        ...createdUser,
        token,
      };
    },
    loginUser: async (_, args, context) => {
      const { password, email } = args.loginUser;
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new GraphQLError(
          'Password or Email is wrong. Please try again.',
          {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          },
        );
      }

      const createdUser = {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      };

      const token = signToken(createdUser);

      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      };

      context.res.cookie('jwt', token, cookieOptions);

      return {
        ...createdUser,
        token,
      };
    },
  },
  Date: dateScalar,
};

export default resolvers;
