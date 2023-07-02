import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const companyInfoSchema = new TEISchemaGenerator('companyInfo', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the company.',
  },
  name: {
    type: 'String!',
    description: 'The name of the  company',
  },
  notes: {
    type: 'String',
    description: 'Notes for the company',
  },
  level: {
    type: 'serviceLevelType',
    description: 'The market size of the company.',
  },
});

const companyInfo = companyInfoSchema.getSchemaString();
export default companyInfo;
