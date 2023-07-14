import mongoose from 'mongoose';
import Comment from './Comment.mjs';
import TicketMetric from './TicketMetric.mjs';

const TicketSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
      default: '649db7e0a620e750895abe42',
    },
    assignee: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    requester: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['New', 'Open', 'Pending', 'Blocked', 'Solved', 'Closed'],
      default: 'New',
    },
    priority: {
      type: String,
      enum: ['Low', 'Normal', 'High', 'Urgent'],
      default: 'Normal',
    },
    channel: {
      type: String,
      enum: ['email', 'app'],
      default: 'app',
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
    history: {
      select: false,
      type: [
        {
          updaterName: String,
          updaterId: String,
          type: {
            type: String,
            enum: ['create', 'update'],
          },
          group: String,
          assignee: String,
          requester: String,
          title: String,
          description: String,
          status: String,
          priority: String,
          comment: {
            commentId: String,
            author: String,
            content: String,
            private: Boolean,
          },
          updatedAt: {
            type: Date,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

TicketSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'comments',
  })
    .populate({
      path: 'assignee',
    })
    .populate({
      path: 'requester',
    })
    .populate({ path: 'group' });
  next();
});

TicketSchema.pre('save', async function (next) {
  if (!this.$isNew) {
    return next();
  }
  if (this.status !== 'Solved' || this.status !== 'Closed') {
    const ticketMetric = {
      ticket: this._id,
      unassigned: {
        lastChange: Date.now(),
      },
      status: {
        currentStatus: this.status,
        [`${this.status}`]: {
          lastChange: Date.now(),
        },
      },
      response: {
        lastChange: Date.now(),
      },
    };

    // TODO: handle if created and assigned

    await TicketMetric.create(ticketMetric);
  }

  const history = this.history[0];
  if (this.comments && this.comments.length > 0) {
    const comment = await Comment.findById(
      this.comments[0].toString().replace(/new ObjectId\("(.*)"\)/, '$1'),
    );

    this.history = [
      {
        ...this,
        type: 'create',
        comment: {
          commentId: comment.id,
          author: comment.author.id,
          content: comment.content,
          private: comment.private,
        },
        updaterName: history.updaterName,
        updaterId: history.updaterId,
      },
    ];
    return next();
  }
  this.history = [
    {
      ...this,
      type: 'create',
      updaterName: history.updaterName,
      updaterId: history.updaterId,
    },
  ];
  next();
});

TicketSchema.pre('findOneAndUpdate', async function (next) {
  console.log(this);
  //const ticketID = this._conditions._id;

  // if (ticketID) {
  //  const ticketMetric = await TicketMetric.findOne({ ticket: ticketID });

  // if ticket metric not null
  //  if assignee not null && ticketMetric.assignee is null
  //    update total time and set last change to null
  //    set ID of assingee to ticketMetric
  //  if not closed status
  //    if status is equal to solved - set totalTicket to datenow - createdAt
  //    else
  //      if status !== to status.currentStatus
  //        status[CurrentStatus].total =  status[CurrentStatus].total + (datenow - status[CurrentStatus].lastChange)
  //        status[CurrentStatus].lastChange = null
  //      else
  //        status === status.currentStatus
  //        status[CurrentStatus].total = status[CurrentStatus].total + (datenow - status[CurrentStatus].lastChange)
  //        status[CurrentStatus].lastChange = Date now
  //  if comment and comment author
  //    look up comment author to find role
  //    if not user
  //      set responses ++
  //      set total = total + (date now - response.lastChange)
  //      set last change null
  //    if user and !response.lastChange
  //      set lastChange to Date.now
  // TODO: first response time - **update model first
  //
  // }

  next();
});

TicketSchema.pre(/(findOneAndUpdate|updateMany)/, function (next) {
  this._update.$push = {
    ...this._update.$push,
    history: {
      ...this._update,
      comment: {
        ...this._update?.comment,
        commentId:
          this._update?.$push?.comments || this._update?.comment?.commentId,
      },
      type: 'update',
      updatedAt: this._update.$set.updatedAt,
    },
  };
  next();
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
