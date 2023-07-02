import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const createUserSchema = new QMSchemaGenerator(
  'createUser',
  {
    createUser: {
      type: 'createUser!',
      description: 'Object of new user information',
    },
    agentCreated: {
      type: 'Boolean!',
      description:
        'Is the user being created by an agent on behave of the user.',
    },
  },
  {
    type: 'user!',
    description: 'The created user.',
  },
);

const createUser = createUserSchema.getSchemaString();

export default createUser;
