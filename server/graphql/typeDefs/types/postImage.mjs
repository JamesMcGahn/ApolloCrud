import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const postImageSchema = new TEISchemaGenerator('postImage', 'type', {
  url: {
    type: 'String',
    description: 'The url of the Image',
  },
  filename: {
    type: 'String',
    description: 'The filename of the Image',
  },
});

const postImage = postImageSchema.getSchemaString();
export default postImage;
