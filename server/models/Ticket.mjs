import mongoose from 'mongoose';
import Comment from './Comment.mjs';
import User from './User.mjs';
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
      ticketTotal: {
        createAt: Date.now(),
      },
    };
    if (this.assignee) {
      ticketMetric.unassigned.lastChange = 0;
      ticketMetric.unassigned.total = 0;
      ticketMetric.group = this.group;
      ticketMetric.groupChange = 1;
      ticketMetric.assignee = this.assignee;
      ticketMetric.assigneeChange = 1;
    }

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

const ticketMetricUpdate = async (ticketId, upObj) => {
  try {
    if (ticketId) {
      const ticketMetric = await TicketMetric.findOne({ ticket: ticketId });

      if (ticketMetric) {
        const currentTime = Date.now();
        if (!upObj.assignee && !ticketMetric.assignee) {
          ticketMetric.unassigned.total +=
            currentTime - ticketMetric.unassigned.lastChange;
          ticketMetric.unassigned.lastChange = currentTime;
        }

        if (upObj.assignee === null) {
          ticketMetric.assignee = null;
          ticketMetric.unassigned.total +=
            currentTime - ticketMetric.unassigned.lastChange;
          ticketMetric.unassigned.lastChange = currentTime;
        }

        if (upObj.assignee && !ticketMetric.assignee) {
          ticketMetric.assignee = upObj.assignee;
          ticketMetric.unassigned.total +=
            currentTime - ticketMetric.unassigned.lastChange;
          ticketMetric.unassigned.lastChange = 0;
          ticketMetric.assigneeChange = 1;
        }

        if (upObj.assignee && ticketMetric.assignee) {
          if (upObj.assignee !== ticketMetric.assignee) {
            ticketMetric.assignee = upObj.assignee;
            ticketMetric.assigneeChange += 1;
          }
        }

        if (upObj.group && !ticketMetric.group) {
          ticketMetric.group = upObj.group;
          ticketMetric.groupChange = 1;
        }

        if (upObj.group && ticketMetric.group) {
          if (upObj.group !== ticketMetric.group) {
            ticketMetric.group = upObj.group;
            ticketMetric.groupChange += 1;
          }
        }

        if (upObj.status !== 'Closed') {
          if (upObj.status === 'Solved') {
            ticketMetric.ticketTotal.total +=
              currentTime - ticketMetric.ticketTotal.createAt;

            if (ticketMetric.ticketFirstSolve === 0) {
              ticketMetric.ticketFirstSolve =
                currentTime - ticketMetric.ticketTotal.createAt;
            }
          }

          if (upObj.status !== ticketMetric.status.currentStatus) {
            ticketMetric.status[ticketMetric.status.currentStatus].total +=
              currentTime -
              ticketMetric.status[ticketMetric.status.currentStatus].lastChange;
            ticketMetric.status[
              ticketMetric.status.currentStatus
            ].lastChange = 0;
            ticketMetric.status[upObj.status].lastChange = currentTime;
            ticketMetric.status.currentStatus = upObj.status;
          } else {
            ticketMetric.status[upObj.status].total +=
              currentTime - ticketMetric.status[upObj.status].lastChange;
            ticketMetric.status[upObj.status].lastChange = currentTime;
          }

          if (
            upObj.comment &&
            upObj.comment?.author &&
            !upObj.comment?.private
          ) {
            const user = await User.findById(upObj.comment?.author);

            if (user.role !== 'user') {
              if (
                ticketMetric.response.total === 0 &&
                ticketMetric.response.lastChange !== 0
              ) {
                ticketMetric.firstResponse =
                  currentTime - ticketMetric.ticketTotal.createAt;
              }

              ticketMetric.response.responses += 1;
              ticketMetric.response.total +=
                currentTime - ticketMetric.response.lastChange;
              ticketMetric.response.lastChange = 0;
            }
            if (user.role === 'user') {
              ticketMetric.response.lastChange = currentTime;
            }
          }
        }
        return await ticketMetric.save();
      }
    }
  } catch (e) {
    console.log(e);
  }
};

TicketSchema.pre('findOneAndUpdate', async function (next) {
  // console.log(this);
  const ticketID = this._conditions._id;
  ticketMetricUpdate(ticketID, this._update);
  next();
});

TicketSchema.pre('updateMany', async function (next) {
  const results = this._conditions._id.$in.map(
    async (id) => await ticketMetricUpdate(id, this._update),
  );
  await Promise.all(results);

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
