import TEISchemaGenerator from '../TEISchemaGenerator.mjs';

const statusTypeSchema = new TEISchemaGenerator('statusType', 'enum', {
  New: {
    type: 'enum',
    description: 'The ticket is new and unassigned',
  },
  Open: {
    type: 'enum',
    description: 'The ticket requires agent action.',
  },
  Pending: {
    type: 'enum',
    description: 'The ticket is waiting for the assignee to respond.',
  },
  Blocked: {
    type: 'enum',
    description:
      'The ticket is blocked on circumstances outside of the requester and assignee.',
  },
  Solved: {
    type: 'enum',
    description: 'The ticket is completed.',
  },
  Closed: {
    type: 'enum',
    description: 'The ticket is archived and cannot be changed.',
  },
});

const statusType = statusTypeSchema.getSchemaString();
export default statusType;
