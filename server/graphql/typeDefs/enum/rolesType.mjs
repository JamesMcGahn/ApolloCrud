import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const rolesTypeSchema = new TEISchemaGenerator('rolesType', 'enum', {
  user: {
    type: 'enum',
    description: 'The role for the customer.',
  },
  agent: {
    type: 'enum',
    description: 'The role for the support agent.',
  },
  lead: {
    type: 'enum',
    description: 'The role for the support lead.',
  },
  admin: {
    type: 'enum',
    description: 'The role for the application admins.',
  },
});

const rolesType = rolesTypeSchema.getSchemaString();
export default rolesType;
