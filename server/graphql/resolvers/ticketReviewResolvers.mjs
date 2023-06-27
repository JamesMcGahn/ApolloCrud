import { GraphQLError } from 'graphql';
import Ticket from '../../models/Ticket.mjs';
import TicketReview from '../../models/TicketReview.mjs';

const createTicketReview = async (_, args, context) => {
  const { user } = context;
  const { newTicketReview } = args;
  const { ticket, reviewer } = newTicketReview;

  const foundTicket = await Ticket.findById(ticket);

  if (!foundTicket) {
    throw new GraphQLError('We cannot find that Ticket Id', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  if (
    !user ||
    user.role !== 'user' ||
    user.id !== reviewer ||
    reviewer !== foundTicket.requester.id
  ) {
    throw new GraphQLError('You dont have permission to create a Review', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }

  const review = await TicketReview.create(newTicketReview);

  return await TicketReview.findById(review.id)
    .populate('agent')
    .populate('reviewer');
};

const getTicketReview = async (_, args, context) => {
  const { ticket } = args;
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

  return ticketReview;
};

export { createTicketReview, getTicketReview };
