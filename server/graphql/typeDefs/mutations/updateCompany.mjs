import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const updateCompanySchema = new QMSchemaGenerator(
  'updateCompany',
  {
    id: {
      type: 'ID!',
      description: 'The ID of the company',
    },
    updateCompany: {
      type: 'updateCompany!',
      description: 'Object of updated company information',
    },
  },
  {
    type: 'company!',
    description: 'The updated company information.',
  },
);

const updateCompany = updateCompanySchema.getSchemaString();

export default updateCompany;
