import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const companiesSchema = new QMSchemaGenerator('companies', false, {
  type: '[companyInfo!]',
  description: 'The array of companies',
});

const companies = companiesSchema.getSchemaString();

export default companies;
