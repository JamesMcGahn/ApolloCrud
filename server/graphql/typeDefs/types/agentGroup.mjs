import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const agentGroupSchema = new TEISchemaGenerator('agentGroup', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the Group.',
  },
  name: {
    type: 'String!',
    description: 'The name of the group',
  },
  users: {
    type: '[userInfo]',
    description: 'Array of Users of the group',
  },
});

const agentGroup = agentGroupSchema.getSchemaString();
export default agentGroup;
