import { GraphQLError } from 'graphql';

const protectRoute = (
  context,
  restricted,
  condition,
  message = 'You dont have permission to view',
) => {
  const { user } = context;

  if (!user) {
    throw new GraphQLError('You must be logged in to view.', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  if (restricted?.includes(user.role)) {
    throw new GraphQLError(`${message}`, {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  if (condition) {
    throw new GraphQLError(`${message}`, {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
};

export default protectRoute;
