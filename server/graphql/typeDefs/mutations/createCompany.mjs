import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const createCompanySchema = new QMSchemaGenerator(
  'createCompany',
  {
    newCompany: {
      type: 'newCompany!',
      description: 'Object of new company information',
    },
  },
  {
    type: 'company!',
    description: 'The new company information.',
  },
);

const createCompany = createCompanySchema.getSchemaString();

export default createCompany;
