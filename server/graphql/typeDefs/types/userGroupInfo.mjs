import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const userGroupInfoSchema = new TEISchemaGenerator('userGroupInfo', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the agent.',
  },
  name: {
    type: 'String',
    description: 'The name of the agent.',
  },
  groups: {
    type: '[groupInfo]',
    description: 'Array of groups that an agent belongs to.',
  },
});

const userGroupInfo = userGroupInfoSchema.getSchemaString();
export default userGroupInfo;
