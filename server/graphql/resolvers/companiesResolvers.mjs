import { GraphQLError } from 'graphql';
import Company from '../../models/Company.mjs';

const getAllCompanies = async (_, args, context) => {
  const { user } = context;
  if (!user || user.role === 'user') {
    throw new GraphQLError('You dont have permission to view', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
  return await Company.find().populate('users');
};

// trunk-ignore(eslint/import/prefer-default-export)
export { getAllCompanies };
