import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
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
      enum: ['New', 'Open', 'Pending', 'Blocked', 'Closed'],
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
    });
  next();
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
