import { GraphQLError } from 'graphql';
import Company from '../../models/Company.mjs';
import User from '../../models/User.mjs';

const getAllCompanies = async (_, args, context) => {
  const { user } = context;
  if (!user || user.role === 'user') {
    throw new GraphQLError('You dont have permission to view', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
  return await Company.find().populate('users');
};

const createCompany = async (_, args) => {
  const { newCompany } = args;

  return await Company.create(newCompany);
};

const updateACompany = async (_, args) => {
  const { updateCompany, id } = args;

  let company;

  if (updateCompany?.users.length > 0) {
    const userArry = [...updateCompany.users];

    await Promise.all(
      userArry.map((user) => User.findByIdAndUpdate(user, { company: id })),
    );
    const { name, notes, level } = updateCompany;
    company = Company.findByIdAndUpdate(
      id,
      {
        name,
        notes,
        level,
        $addToSet: { users: { $each: updateCompany.users } },
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate('users');
    return await company;
  }

  return Company.findByIdAndUpdate(
    id,
    { ...updateCompany },
    {
      new: true,
      runValidators: true,
    },
  ).populate('users');
};

export { createCompany, updateACompany, getAllCompanies };
