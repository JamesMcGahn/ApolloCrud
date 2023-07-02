import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const userSchema = new QMSchemaGenerator(
  'user',
  {
    id: {
      type: 'ID!',
      description: 'ID of the user',
    },
  },
  {
    type: 'userInfo!',
    description: 'Returns the user of the ID passed.',
  },
);

const user = userSchema.getSchemaString();

export default user;
