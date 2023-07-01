import Group from '../../models/Group.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getAllGroups = async (_, args, context) => {
  protectRoute(context, ['user']);

  return await Group.find().populate('users');
};

// trunk-ignore(eslint/import/prefer-default-export)
export { getAllGroups };
