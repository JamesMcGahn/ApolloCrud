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

  return await Company.findById(id).populate('users');
};

const createCompany = async (_, args) => {
  const { newCompany } = args;

  return await Company.create(newCompany);
};

const updateACompany = async (_, args) => {
  const { updateCompany, id } = args;

  let company;

  if (updateCompany?.users && updateCompany.users.length > 0) {
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

const deleteACompany = async (_, args) => {
  const { id } = args;

  const company = await Company.findById(id).populate('users');
  if (company.users && company?.users?.length > 0) {
    const delCompUsers = company.users;

    await Promise.all(
      delCompUsers.map((user) => {
        return User.findByIdAndUpdate(user.id, {
          company: null,
        });
      }),
    );
  }

  return await Company.findByIdAndRemove(id).populate('users');
};
export { createCompany, updateACompany, getCompany, deleteACompany };
