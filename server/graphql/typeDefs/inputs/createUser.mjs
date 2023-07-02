import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const createUserSchema = new TEISchemaGenerator('createUser', 'input', {
  name: {
    type: 'String!',
    description: 'The full name of the User',
  },
  email: {
    type: 'String!',
    description: 'The email name of the User',
  },
  password: {
    type: 'String!',
    description: 'The password for the new user.',
  },
  passwordConfirm: {
    type: 'String!',
    description: 'The confirmation for password of the new user.',
  },
});

const createUser = createUserSchema.getSchemaString();
export default createUser;
