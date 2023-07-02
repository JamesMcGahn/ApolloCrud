import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const updateUserGroupsSchema = new TEISchemaGenerator(
  'updateUserGroups',
  'input',
  {
    userId: {
      type: 'ID!',
      description: 'The ID of the user.',
    },
    groups: {
      type: '[ID!]',
      description: 'The IDs of all the groups a user belongs to.',
    },
  },
);

const updateUserGroups = updateUserGroupsSchema.getSchemaString();
export default updateUserGroups;
