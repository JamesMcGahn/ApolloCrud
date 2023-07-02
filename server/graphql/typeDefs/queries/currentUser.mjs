import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const currentUserSchema = new QMSchemaGenerator('currentUser', false, {
  type: 'userInfo!',
  description: 'Returns current user logged in.',
});

const currentUser = currentUserSchema.getSchemaString();

export default currentUser;
