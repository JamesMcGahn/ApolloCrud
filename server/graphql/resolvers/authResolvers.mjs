import { GraphQLError } from 'graphql';
import User from '../../models/User.mjs';
import signToken from '../../utils/signToken.mjs';

const loginUser = async (_, args, context) => {
  const { password, email } = args.loginUser;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new GraphQLError('Password or Email is wrong. Please try again.', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  const createdUser = {
    id: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
  };

  const token = signToken(createdUser);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  };

  context.res.cookie('jwt', token, cookieOptions);

  return {
    ...createdUser,
    token,
  };
};

const signOut = (_, args, context) => {
  context.res.cookie('jwt', 'expired', {
    expires: new Date(Date.now() + 3 * 1000),
    http: true,
  });

  return true;
};

const currentUser = async (_, args, context) => {
  const { user } = context;
  if (!user) {
    throw new GraphQLError('You dont have permission to view', {
      extensions: {
        code: 'Not Logged In',
        http: { status: 200 },
      },
    });
  }
  return user;
};

export { loginUser, signOut, currentUser };
