import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const groupInfoSchema = new TEISchemaGenerator('groupInfo', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the Group.',
  },
  name: {
    type: 'String!',
    description: 'The name of the group',
  },
});

const groupInfo = groupInfoSchema.getSchemaString();
export default groupInfo;
