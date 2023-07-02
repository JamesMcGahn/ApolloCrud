import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateUserGroupsSchema = new QMSchemaGenerator(
  'updateUserGroups',
  {
    updateUserGroups: {
      type: 'updateUserGroups!',
      description: 'Object of updated user group information',
    },
  },
  {
    type: 'userGroupInfo!',
    description: "The updated user's group information.",
  },
);

const updateUserGroups = updateUserGroupsSchema.getSchemaString();

export default updateUserGroups;
