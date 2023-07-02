import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const resetPasswordSchema = new TEISchemaGenerator('resetPassword', 'input', {
  password: {
    type: 'String!',
    description: 'The password for the new user.',
  },
  passwordConfirm: {
    type: 'String!',
    description: 'The confirmation for password of the new user.',
  },
  token: {
    type: 'String!',
    description: 'The new auth token for the user.',
  },
});

const resetPassword = resetPasswordSchema.getSchemaString();
export default resetPassword;
