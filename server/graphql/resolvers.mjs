import { GraphQLError } from 'graphql';
import dateScalar from './scalars/dateScalar.mjs';
import Ticket from '../models/Ticket.mjs';
import Comment from '../models/Comment.mjs';
import User from '../models/User.mjs';
import signToken from '../utils/signToken.mjs';

const resolvers = {
  Query: {
    tickets: async () => {
      const tickets = await Ticket.find();

      return tickets;
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
      const { userId } = args;
      const tickets = await Ticket.find({
        $or: [{ assignee: userId }, { requester: userId }],
      });
      return tickets;
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
  },
  Mutation: {
    createTicket: async (_, args) => {
      const { newTicket } = args;
      const ticket = await Ticket.create(newTicket);

      return ticket;
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
          'You are not authorized to perform this action.',
          {
            extensions: {
              code: 'FORBIDDEN',
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
