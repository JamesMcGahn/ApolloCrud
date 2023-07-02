import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const updateCompanySchema = new TEISchemaGenerator('updateCompany', 'input', {
  name: {
    type: 'String',
    description: 'The name of the  company',
  },
  users: {
    type: '[ID]',
    description: 'IDs to users to add to the company',
  },
  domain: {
    type: 'String',
    description: 'The domain of the company',
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

const updateCompany = updateCompanySchema.getSchemaString();
export default updateCompany;
