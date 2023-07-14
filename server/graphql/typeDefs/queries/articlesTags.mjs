import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const articlesTagsSchema = new QMSchemaGenerator('articlesTags', false, {
  type: '[String]',
  description: 'Array of Article Tags',
});

const articlesTags = articlesTagsSchema.getSchemaString();

export default articlesTags;
