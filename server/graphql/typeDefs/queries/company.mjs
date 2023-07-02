import QMSchemaGenerator from '../QMSchemaGenerator.mjs';

const companySchema = new QMSchemaGenerator(
  'company',
  {
    id: {
      type: 'ID',
      description: 'The ID of the company.',
    },
  },
  {
    type: 'company!',
    description: "The company's information",
  },
);

const company = companySchema.getSchemaString();

export default company;
