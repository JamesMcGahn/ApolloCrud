import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const resetPasswordSchema = new QMSchemaGenerator(
  'resetPassword',
  {
    resetPassword: {
      type: 'resetPassword!',
      description: 'Object of user reset information.',
    },
  },
  {
    type: 'Boolean!',
    description: 'True if the password was successfully reset.',
  },
);

const resetPassword = resetPasswordSchema.getSchemaString();

export default resetPassword;
