import User from '../../models/User.mjs';
import Group from '../../models/Group.mjs';
import signToken from '../../utils/signToken.mjs';
import Company from '../../models/Company.mjs';
import sendEmail from '../../utils/sendEmail.mjs';
import emailNoFeedback from '../../templates/emails/emailNoFeedback.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getUser = async (_, args, context) => {
  const { id } = args;
  const { user } = context;
  protectRoute(context, [], user.role === 'user' && id !== user.id);

  return await User.findById(args.id);
};

const createAUser = async (_, args, context) => {
  const { createUser, agentCreated } = args;
  protectRoute(
    context,
    ['user'],
    false,
    'You do not have permission to create a new user',
  );
  const cusDomain = createUser.email.split('@')[1];

  const company = await Company.findOne({ domain: cusDomain });
  let newUser;

  if (company) {
    newUser = await User.create({ ...createUser, company: company.id });
    company.users.addToSet(newUser.id);
    await company.save();
  } else {
    newUser = await User.create({ ...createUser });
  }

  const createdUser = {
    id: newUser._id,
    name: newUser.name,
    role: newUser.role,
    email: newUser.email,
  };

  if (agentCreated) {
    const resetToken = await newUser.createPasswordResetToken();
    await newUser.save({ validateBeforeSave: false });

    const resetURL = `${context.req.protocol}://${
      process.env.NODE_ENV === 'production'
        ? context.req.get('host')
        : 'localhost:3000'
    }/resetpassword?token=${resetToken}`;

    const html = emailNoFeedback(
      `Hi ${newUser.name},`,
      [
        'An account was Created on Your Behalf.',
        `Click the link to reset your password: <a href="${resetURL}" target=”_blank”>Reset Password</a>`,
        'If you did not request a password reset, please ignore this message.',
      ],
      `resetpassword?token=${resetToken}`,
    );
    try {
      await sendEmail({
        email: newUser.email,
        subject: 'An Apollo Tickets Account Was Created For You...',
        html,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const token = signToken(createdUser);

  return {
    ...createdUser,
    token,
  };
};

const updateAUser = async (_, args, context) => {
  const { id, updateUser } = args;
  const { user } = context;

  protectRoute(
    context,
    [],
    user?.id !== id && user.role === 'user',
    'You dont have permission to update other users.',
  );
  protectRoute(
    context,
    [],
    updateUser?.role && user.role !== 'admin',
    'You dont have permission to update roles.',
  );
  protectRoute(
    context,
    [],
    updateUser.company && user.role === 'user',
    'You dont have permission to update companies.',
  );

  if (updateUser.company !== undefined) {
    await User.findByIdAndUpdate(id, updateUser, {
      runValidators: true,
    }).then(async (data) => {
      if (data.company?.id) {
        await Company.findByIdAndUpdate(data.company.id, {
          $pull: { users: data._id },
        });
      }

      if (updateUser.company !== null) {
        await Company.findByIdAndUpdate(updateUser.company, {
          $addToSet: { users: id },
        });
      } else {
        updateUser.company = undefined;
      }
    });
  } else await User.findByIdAndUpdate(id, updateUser, { runValidators: true });
  return await User.findById(id);
};

const updateUserGroups = async (parent, args, context) => {
  protectRoute(context);
  const { groups, userId } = args.updateUserGroups;

  const groupSet = new Set([...groups]);

  await Promise.all(
    [...groupSet].map((group) => {
      return Group.findByIdAndUpdate(group, { $addToSet: { users: userId } });
    }),
  );

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      groups: [...groupSet],
    },
    { new: true },
  ).populate('groups');

  if (updatedUser.groups && updatedUser.groups.length > 0) {
    const difference = updatedUser.groups.filter((x) => {
      return !groups.includes(x.id);
    });

    await Promise.all(
      difference.map((group) => {
        return Group.findByIdAndUpdate(group.id, { $pull: { users: userId } });
      }),
    );
  }

  return await User.findById(userId).populate('groups');
};

const getUserGroup = async (parent, args, context) => {
  const { id } = args;
  return await User.findById(id).populate('groups');
};

export { createAUser, updateAUser, getUser, updateUserGroups, getUserGroup };
