import Company from '../../models/Company.mjs';
import User from '../../models/User.mjs';
import protectRoute from '../../middleware/protectRoute.mjs';

const getCompany = async (_, args, context) => {
  const { id } = args;
  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to view a company.',
  );

  return await Company.findById(id).populate('users');
};

const createCompany = async (_, args, context) => {
  const { newCompany } = args;
  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to create a company.',
  );

  return await Company.create(newCompany);
};

const updateACompany = async (_, args, context) => {
  const { updateCompany, id } = args;
  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to update a company.',
  );
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

const deleteACompany = async (_, args, context) => {
  const { id } = args;

  protectRoute(
    context,
    ['user'],
    false,
    'You dont have permission to delete a company.',
  );

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
