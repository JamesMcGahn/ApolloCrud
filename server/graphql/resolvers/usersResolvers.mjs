import { GraphQLError } from 'graphql';
import User from '../../models/User.mjs';

const getUsers = async (_, args, context) => {
  const { user } = context;
  if (!user || user.role === 'user') {
    throw new GraphQLError('You dont have permission to view', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
  return await User.find();
};

// trunk-ignore(eslint/import/prefer-default-export)
export { getUsers };
