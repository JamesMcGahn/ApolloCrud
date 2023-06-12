import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema(
  {
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
      enum: ['New', 'Open', 'Blocked', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true },
);

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
