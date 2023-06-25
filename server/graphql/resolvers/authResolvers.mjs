import { GraphQLError } from 'graphql';
import User from '../../models/User.mjs';
import signToken from '../../utils/signToken.mjs';
import sendEmail from '../../utils/sendEmail.mjs';

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

const forgotPassword = async (_, args, context) => {
  const { email } = args;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new GraphQLError('We cant find that user.', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${context.req.protocol}://${
    process.env.NODE_ENV === 'production'
      ? context.req.get('host')
      : 'localhost:4000'
  }/resetPassword/${resetToken}`;

  const html = `<h1 style="color:#1976d2;font-size:1.2rem;">Forgot your password?</h1>
  <p style="color:black;font-size:1rem;"> Click the link to reset your password: <a href="${resetURL}" target=”_blank”>Reset Password</a></p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token',
      html,
    });
  } catch (e) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    throw new GraphQLError(
      'There was a problem sending the email. Try again later.',
      {
        extensions: {
          code: 'INTERNAL_ERROR',
        },
      },
    );
  }
  return true;
};

export { loginUser, signOut, currentUser, forgotPassword };
