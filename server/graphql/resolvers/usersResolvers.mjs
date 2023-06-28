import User from '../../models/User.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getUsers = async (_, args, context) => {
  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to view users.',
  );

  return await User.find();
};

// trunk-ignore(eslint/import/prefer-default-export)
export { getUsers };
