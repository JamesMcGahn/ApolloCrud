import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const forgotPasswordSchema = new QMSchemaGenerator(
  'forgotPassword',
  {
    email: {
      type: 'String!',
      description: 'Email of the user.',
    },
  },
  {
    type: 'Boolean!',
    description: 'True if the password was sent.',
  },
);

const forgotPassword = forgotPasswordSchema.getSchemaString();

export default forgotPassword;
