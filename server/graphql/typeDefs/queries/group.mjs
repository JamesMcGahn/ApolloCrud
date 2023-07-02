import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const groupSchema = new QMSchemaGenerator(
  'group',
  {
    id: {
      type: 'ID',
      description: 'The ID of the Group.',
    },
  },
  {
    type: 'agentGroup!',
    description: "The group's information",
  },
);

const group = groupSchema.getSchemaString();

export default group;
