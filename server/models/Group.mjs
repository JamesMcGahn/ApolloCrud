import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        validate: {
          validator: function (id) {
            return new Promise((resolve) => {
              const users = mongoose.model('User');
              users.findById(id).then((user) => resolve(user.role !== 'user'));
            });
          },
          message: 'You cannot add customers to groups',
        },
      },
    ],
  },

  { timestamps: true },
);

const Group = mongoose.model('Group', GroupSchema);

export default Group;
