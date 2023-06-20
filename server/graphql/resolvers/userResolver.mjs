import { GraphQLError } from 'graphql';
import User from '../../models/User.mjs';
import signToken from '../../utils/signToken.mjs';
import Company from '../../models/Company.mjs';

const getUser = async (_, args, context) => {
  const { id } = args;
  const { user } = context;

  if (user.role === 'user' && id !== user.id) {
    throw new GraphQLError('You dont have permission to view', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
  const foundUser = await User.findById(args.id);
  if (!foundUser) {
    throw new GraphQLError('Cant Find That ID', {
      extenstions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  return foundUser;
};

const createAUser = async (_, args) => {
  const { createUser } = args;

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

  const token = signToken(createdUser);

  return {
    ...createdUser,
    token,
  };
};

const updateAUser = async (_, args, context) => {
  const { id, updateUser } = args;
  const { user } = context;

  if (user.id !== id && user.role === 'user') {
    throw new GraphQLError('You dont have permission to view', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  if (updateUser?.role && user.role !== 'admin') {
    throw new GraphQLError('You dont have permission to update roles.', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  if (updateUser.company && user.role === 'user') {
    throw new GraphQLError('You dont have permission to update companies.', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
  if (updateUser.company) {
    await User.findByIdAndUpdate(id, updateUser, { runValidators: true }).then(
      async (data) => {
        await Company.findByIdAndUpdate(data.company.id, {
          $pull: { users: data._id },
        });
        await Company.findByIdAndUpdate(updateUser.company, {
          $addToSet: { users: id },
        });
      },
    );
  } else await User.findByIdAndUpdate(id, updateUser, { runValidators: true });
  return await User.findById(id);
};
export { createAUser, updateAUser, getUser };
