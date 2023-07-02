import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const deleteCompanySchema = new QMSchemaGenerator(
  'deleteCompany',
  {
    id: {
      type: 'ID!',
      description: 'The ID of the company',
    },
  },
  {
    type: 'company!',
    description: 'The deleted company information.',
  },
);

const deleteCompany = deleteCompanySchema.getSchemaString();

export default deleteCompany;
