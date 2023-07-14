import mongoose from 'mongoose';

const TicketMetricSchema = new mongoose.Schema(
  {
    ticket: {
      type: String,
      ref: 'Ticket',
      unqiue: true,
    },
    assignee: {
      type: String,
      ref: 'User',
    },
    unassigned: {
      lastChange: {
        type: Date,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    status: {
      currentStatus: {
        type: String,
        enum: ['New', 'Open', 'Pending', 'Blocked', 'Solved', 'Closed'],
        default: 'New',
      },
      New: {
        lastChange: {
          type: Date,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
      Open: {
        lastChange: {
          type: Date,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
      Pending: {
        lastChange: {
          type: Date,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
      Blocked: {
        lastChange: {
          type: Date,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
    },
    response: {
      lastChange: {
        type: Date,
      },
      responses: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    totalTicket: {
      type: Number,
    },
  },
  { timestamps: true },
);

const TicketMetric = mongoose.model('TicketMetric', TicketMetricSchema);

export default TicketMetric;
