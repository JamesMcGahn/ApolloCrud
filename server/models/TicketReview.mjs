import mongoose from 'mongoose';

const TicketReviewSchema = new mongoose.Schema(
  {
    ticket: {
      type: String,
      ref: 'Ticket',
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
    },
    agent: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const TicketReview = mongoose.model('TicketReview', TicketReviewSchema);

export default TicketReview;
