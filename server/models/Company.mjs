import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    domain: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { domain: { $type: 'string' } },
      },
      default: null,
    },
    notes: {
      type: String,
    },
    level: {
      type: String,
      enum: ['Small', 'Medium', 'Large', 'Enterprise'],
      default: 'Small',
    },
  },
  { timestamps: true },
);

const Company = mongoose.model('Company', CompanySchema);

export default Company;
