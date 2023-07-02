import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const serviceLevelTypeSchema = new TEISchemaGenerator(
  'serviceLevelType',
  'enum',
  {
    Small: {
      type: 'enum',
      description: 'The small market customer.',
    },
    Medium: {
      type: 'enum',
      description: 'The medium market customer.',
    },
    Large: {
      type: 'enum',
      description: 'The large market customer.',
    },
    Enterprise: {
      type: 'enum',
      description: 'The enterprise market customer.',
    },
  },
);

const serviceLevelType = serviceLevelTypeSchema.getSchemaString();
export default serviceLevelType;
