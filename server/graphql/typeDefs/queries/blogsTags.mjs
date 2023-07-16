import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const blogsTagsSchema = new QMSchemaGenerator('blogsTags', false, {
  type: '[String]',
  description: 'Array of Blogs Tags',
});

const blogsTags = blogsTagsSchema.getSchemaString();

export default blogsTags;
