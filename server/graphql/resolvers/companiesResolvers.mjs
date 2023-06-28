import Company from '../../models/Company.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getAllCompanies = async (_, args, context) => {
  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to view all companies.',
  );

  return await Company.find();
};

// trunk-ignore(eslint/import/prefer-default-export)
export { getAllCompanies };
