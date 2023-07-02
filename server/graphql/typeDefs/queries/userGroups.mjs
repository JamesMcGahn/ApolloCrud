import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const userGroupsSchema = new QMSchemaGenerator(
  'userGroups',
  {
    id: {
      type: 'ID!',
      description: 'ID of the user',
    },
  },
  {
    type: 'userGroupInfo!',
    description: 'Returns the user group(s) information of the ID passed.',
  },
);

const userGroups = userGroupsSchema.getSchemaString();

export default userGroups;
