import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const updatePostSchema = new TEISchemaGenerator('updatePost', 'input', {
  title: {
    type: 'String',
    description: 'The title  of the post.',
  },
  featuredImage: {
    type: 'String',
    description: 'The featured image of the post.',
  },
  blurb: {
    type: 'String',
    description: 'Short description blurb of the post',
  },
  content: {
    type: 'String',
    description: 'The content of the post.',
  },
  category: {
    type: '[String]',
    description: 'Categories of the post.',
  },
  tags: {
    type: '[String]',
    description: 'Tags of the post.',
  },
  author: {
    type: 'ID',
    description: "The author's ID",
  },
});

const updatePost = updatePostSchema.getSchemaString();
export default updatePost;
