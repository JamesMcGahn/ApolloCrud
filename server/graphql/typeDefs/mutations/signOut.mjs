import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const signOutSchema = new QMSchemaGenerator('signOut', false, {
  type: 'Boolean!',
  description: 'True if user was successfully signed out.',
});

const signOut = signOutSchema.getSchemaString();

export default signOut;
