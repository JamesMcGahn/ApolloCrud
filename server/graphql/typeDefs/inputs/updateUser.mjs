import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const updateUserSchema = new TEISchemaGenerator('updateUser', 'input', {
  name: {
    type: 'String',
    description: 'The full name of the User',
  },
  email: {
    type: 'String',
    description: 'The email name of the User',
  },
  company: {
    type: 'ID',
    description: 'The company of the User',
  },
  role: {
    type: 'rolesType',
    description: 'rolesType enum',
  },
  isActive: {
    type: 'Boolean',
    description: 'The active status of the User',
  },
});

const updateUser = updateUserSchema.getSchemaString();
export default updateUser;
