import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const priorityTypeSchema = new TEISchemaGenerator('priorityType', 'enum', {
  Low: {
    type: 'enum',
    description: 'The ticket is of Low priority',
  },
  Normal: {
    type: 'enum',
    description: 'The ticket is of Normal priority',
  },
  High: {
    type: 'enum',
    description: 'The ticket is of High priority.',
  },
  Urgent: {
    type: 'enum',
    description: 'The ticket is of Urgent priority',
  },
});

const priorityType = priorityTypeSchema.getSchemaString();
export default priorityType;
