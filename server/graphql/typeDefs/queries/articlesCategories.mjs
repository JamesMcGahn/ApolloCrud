import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const articlesCategoriesSchema = new QMSchemaGenerator(
  'articlesCategories',
  false,
  {
    type: '[String]',
    description: 'Array of Article Categories',
  },
);

const articlesCategories = articlesCategoriesSchema.getSchemaString();

export default articlesCategories;
