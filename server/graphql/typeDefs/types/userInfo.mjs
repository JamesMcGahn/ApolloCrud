import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const userInfoSchema = new TEISchemaGenerator('userInfo', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the User',
  },
  company: {
    type: 'userCompany',
    description: 'The company information for the User.',
  },
  name: {
    type: 'String!',
    description: 'The full name of the User',
  },
  email: {
    type: 'String!',
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

const userInfo = userInfoSchema.getSchemaString();
export default userInfo;
