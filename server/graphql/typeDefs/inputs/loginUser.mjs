import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const loginUserSchema = new TEISchemaGenerator('loginUser', 'input', {
  email: {
    type: 'String!',
    description: 'The email name of the User',
  },
  password: {
    type: 'String!',
    description: 'The password for the new user.',
  },
});

const loginUser = loginUserSchema.getSchemaString();
export default loginUser;
