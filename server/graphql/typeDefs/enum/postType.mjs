import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const postTypeSchema = new TEISchemaGenerator('postType', 'enum', {
  blog: {
    type: 'enum',
    description: 'Post is a blog post.',
  },
  article: {
    type: 'enum',
    description: 'Post is a knownledge article.',
  },
});

const postType = postTypeSchema.getSchemaString();
export default postType;
