import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const loginUserSchema = new QMSchemaGenerator(
  'loginUser',
  {
    loginUser: {
      type: 'loginUser!',
      description: 'Object of user login information.',
    },
  },
  {
    type: 'user!',
    description: 'The user information for the logged in user.',
  },
);

const loginUser = loginUserSchema.getSchemaString();

export default loginUser;
