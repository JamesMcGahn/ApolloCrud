import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const groupsSchema = new QMSchemaGenerator('groups', false, {
  type: '[agentGroup!]',
  description: 'The array of groups',
});

const groups = groupsSchema.getSchemaString();

export default groups;
