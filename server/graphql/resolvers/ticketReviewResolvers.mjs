import { GraphQLError } from 'graphql';
import Ticket from '../../models/Ticket.mjs';
import TicketReview from '../../models/TicketReview.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const createTicketReview = async (_, args, context) => {
  const { user } = context;
  const { newTicketReview } = args;
  const { ticket, reviewer } = newTicketReview;

  protectRoute(
    context,
    ['agent', 'lead'],
    false,
    "Agent's cannot create Reviews",
  );

  const foundTicket = await Ticket.findById(ticket);
  if (!foundTicket) {
    throw new GraphQLError('We cannot find that Ticket Id', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  protectRoute(
    context,
    [],
    user.id !== reviewer || reviewer !== foundTicket.requester.id,
    'You dont have permission to create a Review',
  );

  return await TicketReview.findOneAndUpdate({ ticket }, newTicketReview, {
    upsert: true,
    returnDocument: 'after',
  })
    .populate('agent')
    .populate('reviewer');
};

const getTicketReview = async (_, args, context) => {
  const { ticket } = args;
  const { user } = context;

  const foundTicket = await Ticket.findById(ticket);
  if (!foundTicket) {
    throw new GraphQLError('We cannot find that Ticket Id', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  const ticketReview = await TicketReview.findOne({ ticket: ticket })
    .populate('agent')
    .populate('reviewer');

  protectRoute(
    context,
    [],
    user.role === 'user' && user.id !== foundTicket.requester.id,
    'You dont have permission to view this Review',
  );
  return ticketReview;
};

export { createTicketReview, getTicketReview };
