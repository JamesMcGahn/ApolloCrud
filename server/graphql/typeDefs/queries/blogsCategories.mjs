import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const blogsCategoriesSchema = new QMSchemaGenerator('blogsCategories', false, {
  type: '[String]',
  description: 'Array of Blog Categories',
});

const blogsCategories = blogsCategoriesSchema.getSchemaString();

export default blogsCategories;
