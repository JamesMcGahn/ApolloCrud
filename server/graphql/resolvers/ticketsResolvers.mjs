import { GraphQLError } from 'graphql';
import Ticket from '../../models/Ticket.mjs';
import Comment from '../../models/Comment.mjs';
import Company from '../../models/Company.mjs';
import User from '../../models/User.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const filterPrivate = async (query) => {
  const tickets = await query;
  const filtPrivTickets = tickets.map((tix) => {
    const noPrivComms = tix.comments.filter((comm) => comm.private !== true);
    return {
      ...tix._doc,
      comments: noPrivComms,
      id: tix._doc._id,
    };
  });
  return filtPrivTickets;
};

const ticketsSearch = async (parent, args, context) => {
  const { search } = args;
  protectRoute(context);
  const pattern = /\s(?=(?:[^']*'[^']*')*[^']*$)/;
  const searchString = search.split(pattern);
  const searchObj = searchString
    .map((x) => x.split(':').map((y) => y.trim()))
    .reduce((a, x) => {
      a[x[0]] = x[1];
      return a;
    }, {});

  const query = {};
  query.$and = [];

  if (context.user.role === 'user') {
    query.$and.push({ requester: context.user.id });
  }

  if (searchObj.ticket) {
    return Ticket.find({ _id: searchObj.ticket });
  }

  if (searchObj.title) {
    query.$and.push({ title: new RegExp(searchObj.title, 'i') });
  }

  if (searchObj.priority) {
    query.$and.push({ priority: searchObj.priority });
  }
  if (searchObj.assignee) {
    const assignee = await User.findOne({
      name: new RegExp(searchObj.assignee, 'i'),
    });
    if (assignee) {
      query.$and.push({ assignee: assignee });
    }
  }

  if (searchObj.name) {
    const person = await User.findOne({
      name: new RegExp(searchObj.name, 'i'),
    });
    if (person) {
      query.$and.push({
        $or: [{ assignee: person.id }, { requester: person.id }],
      });
    }
  }
  if (searchObj.requester) {
    const requester = await User.findOne({
      name: new RegExp(searchObj.requester, 'i'),
    });
    if (requester) {
      query.$and.push({ requester: requester });
    }
  }

  if (searchObj.email) {
    const person = await User.findOne({
      email: new RegExp(searchObj.email, 'i'),
    });
    if (person) {
      query.$and.push({
        $or: [{ assignee: person.id }, { requester: person.id }],
      });
    }
  }

  if (searchObj.company) {
    const company = await Company.findOne({
      name: new RegExp(searchObj.company, 'i'),
    });
    const usersIds = company?.users;

    if (company && usersIds) {
      query.$and.push({ requester: { $in: usersIds } });
    }
  }

  if (searchObj.status) {
    const statuses = searchObj.status.split(',');
    query.$and.push({ status: { $in: statuses } });
  }
  if (
    (context.user.role !== 'user' && query.$and.length > 0) ||
    (context.user.role === 'user' && query.$and.length > 1)
  ) {
    return await Ticket.find(query);
  }
  return [];
};

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
    return await filterPrivate(ticket);
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
      return filterPrivate(Ticket.find({ _id: { $in: ids } }));
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
  let tickets;

  if (!status || status.includes(null)) {
    tickets = Ticket.find({
      $or: [{ assignee: userId }, { requester: userId }],
      status: { $ne: 'Closed' },
    });
  }

  if (status && !status.includes(null)) {
    tickets = Ticket.find({
      $or: [{ assignee: userId }, { requester: userId }],
      status: { $in: status },
    });
  }

  if (user.role === 'user') {
    return await filterPrivate(tickets);
  }
  return await tickets;
};

export { getTickets, bulkUpdateTickets, myTickets, ticketsSearch };
