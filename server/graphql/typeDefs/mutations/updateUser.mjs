import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateUserSchema = new QMSchemaGenerator(
  'updateUser',
  {
    id: {
      type: 'ID!',
      description: 'ID of the user',
    },
    updateUser: {
      type: 'updateUser!',
      description: 'Object of updated user information',
    },
  },
  {
    type: 'user!',
    description: 'The updated user.',
  },
);

const updateUser = updateUserSchema.getSchemaString();

export default updateUser;
