import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const userCompanySchema = new TEISchemaGenerator('userCompany', 'type', {
  id: {
    type: 'ID!',
    description: 'The ID of the userCompany.',
  },
  name: {
    type: 'String!',
    description: "The name of the user's company",
  },
});

const userCompany = userCompanySchema.getSchemaString();
export default userCompany;
