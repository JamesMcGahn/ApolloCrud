import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const historyUpdateTypeSchema = new TEISchemaGenerator(
  'historyUpdateType',
  'enum',
  {
    update: {
      type: 'enum',
      description: 'The history event was from ticket creation.',
    },
    create: {
      type: 'enum',
      description: 'The history event was from ticket update.',
    },
  },
);

const historyUpdateType = historyUpdateTypeSchema.getSchemaString();
export default historyUpdateType;
