import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const usersSchema = new QMSchemaGenerator(
  'users',
  {
    roles: {
      type: '[rolesType]',
      description: 'Array of roles.',
    },
  },
  {
    type: '[userInfo!]',
    description: 'Array of users.',
  },
);

const users = usersSchema.getSchemaString();

export default users;
