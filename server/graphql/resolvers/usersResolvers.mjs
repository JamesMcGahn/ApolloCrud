import User from '../../models/User.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getUsers = async (_, args, context) => {
  const { roles } = args;

  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to view users.',
  );

  if (roles && roles.length > 0) {
    return await User.find({ role: { $in: roles } });
  }
  return await User.find();
};

// trunk-ignore(eslint/import/prefer-default-export)
export { getUsers };
