import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const channelTypeSchema = new TEISchemaGenerator('channelType', 'enum', {
  app: {
    type: 'enum',
    description: 'The ticket was created via the app.',
  },
  email: {
    type: 'enum',
    description: 'The ticket was created via email.',
  },
});

const channelType = channelTypeSchema.getSchemaString();
export default channelType;
