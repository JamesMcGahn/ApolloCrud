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
    "Agent's cannot to create Reviews",
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

  const review = await TicketReview.create(newTicketReview);

  return await TicketReview.findById(review.id)
    .populate('agent')
    .populate('reviewer');
};

const getTicketReview = async (_, args, context) => {
  const { ticket } = args;
  const { user } = context;

  const ticketReview = await TicketReview.findOne({ ticket: ticket })
    .populate('agent')
    .populate('reviewer');
  if (!ticketReview) {
    throw new GraphQLError('We cannot find that Ticket Id', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  protectRoute(
    context,
    [],
    user.role === 'user' && user.id !== ticketReview.reviewer,
    'You dont have permission to view this Review',
  );
  return ticketReview;
};

export { createTicketReview, getTicketReview };
