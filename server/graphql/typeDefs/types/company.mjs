import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const companySchema = new TEISchemaGenerator('company', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the company.',
  },
  name: {
    type: 'String!',
    description: 'The name of the  company',
  },
  domain: {
    type: 'String',
    description: 'The domain of the company',
  },
  users: {
    type: '[userInfo]',
    description: 'Users of the company',
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

const company = companySchema.getSchemaString();
export default company;
