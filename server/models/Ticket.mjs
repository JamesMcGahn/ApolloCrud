import mongoose from 'mongoose';
import Comment from './Comment.mjs';

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
            id: String,
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
          id: comment.id,
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

TicketSchema.pre(/(findOneAndUpdate|updateMany)/, function (next) {
  this._update.$push = {
    ...this._update.$push,
    history: {
      ...this._update,
      comment: { ...this._update?.comment, id: this._update?.$push?.comments },
      type: 'update',
      updatedAt: this._update.$set.updatedAt,
    },
  };
  next();
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
