import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const publicUserInfoSchema = new TEISchemaGenerator('publicUserInfo', 'type', {
  id: {
    type: 'ID',
    description: 'The ID of the User',
  },
  name: {
    type: 'String!',
    description: 'The full name of the User',
  },
  email: {
    type: 'String',
    description: 'The email name of the User',
  },
  role: {
    type: 'rolesType!',
    description: 'rolesType enum',
  },
  isActive: {
    type: 'Boolean!',
    description: 'The active status of the User',
  },
});

const publicUserInfo = publicUserInfoSchema.getSchemaString();
export default publicUserInfo;
