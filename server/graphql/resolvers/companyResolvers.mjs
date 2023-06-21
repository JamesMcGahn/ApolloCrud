import { GraphQLError } from 'graphql';
import Company from '../../models/Company.mjs';
import User from '../../models/User.mjs';

const getCompany = async (_, args, context) => {
  const { user } = context;
  const { id } = args;
  if (!user || user.role === 'user') {
    throw new GraphQLError('You dont have permission to view', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  const foundCompany = await Company.findById(id).populate('users');
  if (!foundCompany) {
    throw new GraphQLError('We cant find that company.', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
  return foundCompany;
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

export { createCompany, updateACompany, getCompany };
