import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const updateGroupSchema = new TEISchemaGenerator('updateGroup', 'input', {
  id: {
    type: 'ID!',
    description: 'The ID of the group.',
  },
  name: {
    type: 'String',
    description: 'The name of the group.',
  },
  users: {
    type: '[ID]',
    description: 'IDs of users to add to the group.',
  },
});

const updateGroup = updateGroupSchema.getSchemaString();
export default updateGroup;
