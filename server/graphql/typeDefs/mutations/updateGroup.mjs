import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateGroupSchema = new QMSchemaGenerator(
  'updateGroup',
  {
    updateGroup: {
      type: 'updateGroup!',
      description: 'Object of update group information.',
    },
  },
  {
    type: 'agentGroup!',
    description: 'The updated group.',
  },
);

const updateGroup = updateGroupSchema.getSchemaString();

export default updateGroup;
