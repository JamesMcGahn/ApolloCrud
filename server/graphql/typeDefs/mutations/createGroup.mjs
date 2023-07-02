import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const createGroupSchema = new QMSchemaGenerator(
  'createGroup',
  {
    groupName: {
      type: 'String!',
      description: 'The name of the group to create.',
    },
  },
  {
    type: 'agentGroup!',
    description: 'The create group.',
  },
);

const createGroup = createGroupSchema.getSchemaString();

export default createGroup;
