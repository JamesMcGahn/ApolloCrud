import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const userSchema = new TEISchemaGenerator('user', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the User',
  },
  company: {
    type: 'userCompany',
    description: "The user's company information. ID and name.",
  },
  name: {
    type: 'String!',
    description: 'The full name of the User',
  },
  email: {
    type: 'String!',
    description: 'The email name of the User',
  },
  isActive: {
    type: 'Boolean!',
    description: 'The active status of the User',
  },
  role: {
    type: 'rolesType!',
    description: 'rolesType enum',
  },
  token: {
    type: 'String',
    description: 'The jwt auth token for the user.',
  },
});

const user = userSchema.getSchemaString();
export default user;
