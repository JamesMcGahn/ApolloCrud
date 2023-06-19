import User from '../../models/User.mjs';
import signToken from '../../utils/signToken.mjs';

const createAUser = async (_, args) => {
  const { createUser } = args;
  const newUser = await User.create(createUser);

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

// trunk-ignore(eslint/import/prefer-default-export)
export { createAUser };
