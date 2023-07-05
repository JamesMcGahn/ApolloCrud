import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const postStatusTypeSchema = new TEISchemaGenerator('postStatusType', 'enum', {
  draft: {
    type: 'enum',
    description: 'The post is a draft.',
  },
  published: {
    type: 'enum',
    description: 'The post is published.',
  },
});

const postStatusType = postStatusTypeSchema.getSchemaString();
export default postStatusType;
