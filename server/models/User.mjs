import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (pw) {
          return pw === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    role: {
      type: String,
      enum: ['user', 'agent', 'lead', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = '';
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
