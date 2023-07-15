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
      default: null,
    },
    group: {
      type: String,
      ref: 'Group',
      default: null,
    },
    assigneeChange: {
      type: Number,
      default: 0,
    },
    groupChange: {
      type: Number,
      default: 0,
    },
    unassigned: {
      lastChange: {
        type: Date,
        default: 0,
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
          default: 0,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
      Open: {
        lastChange: {
          type: Date,
          default: 0,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
      Pending: {
        lastChange: {
          type: Date,
          default: 0,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
      Blocked: {
        lastChange: {
          type: Date,
          default: 0,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
      Solved: {
        lastChange: {
          type: Date,
          default: 0,
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
        default: 0,
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
    firstResponse: {
      type: Number,
      default: 0,
    },
    ticketFirstSolve: {
      type: Number,
      default: 0,
    },
    ticketTotal: {
      total: {
        type: Number,
        default: 0,
      },
      createAt: {
        type: Date,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

const TicketMetric = mongoose.model('TicketMetric', TicketMetricSchema);

export default TicketMetric;
