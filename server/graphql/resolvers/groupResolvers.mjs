import { GraphQLError } from 'graphql';
import Group from '../../models/Group.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getGroup = async (parent, args, context) => {
  protectRoute(context, ['users']);
  return await Group.findById(args.id).populate('users');
};

const createGroup = async (parent, args, context) => {
  protectRoute(context, ['users']);
  const { groupName } = args;

  return await Group.create({ name: groupName });
};

const updateAGroup = async (parent, args, context) => {
  protectRoute(context, ['users']);
  const { updateGroup } = args;

  let group;
  if (updateGroup.users?.length > 0) {
    group = await Group.findByIdAndUpdate(
      updateGroup.id,
      {
        name: updateGroup.name,
        $addToSet: { users: { $each: updateGroup.users } },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  } else {
    group = await Group.findByIdAndUpdate(
      updateGroup.id,
      { name: updateGroup.name },
      {
        new: true,
        runValidators: true,
      },
    );
  }
  if (!group) {
    throw new GraphQLError('We cannot find that Group', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }

  return group;
};

export { createGroup, updateAGroup, getGroup };
