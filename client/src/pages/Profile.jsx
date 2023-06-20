import { useQuery, useMutation } from '@apollo/client';
import CustomerLayout from '../components/layout/CustomerLayout';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import updateAUser from '../graphql/mutations/updateAUser';
import ProfileForm from '../components/forms/ProfileForm';
import Spinner from '../components/ui/LoadingSpinner';

function Profile() {
  const { data, loading } = useQuery(loggedInUserQ);

  const [updateUser, { loading: updateLoading, data: updateData }] =
    useMutation(updateAUser, {
      refetchQueries: [{ query: loggedInUserQ }],
    });

  const handleUpdate = (user) => {
    const userChange = {
      name: user?.name,
      email: user?.email,
    };
    updateUser({
      variables: { updateUserId: user.id, updateUser: userChange },
    });
  };

  return (
    <CustomerLayout>
      {updateLoading || loading ? (
        <Spinner />
      ) : (
        <ProfileForm
          handleSubmit={handleUpdate}
          user={updateData?.updateUser || data.currentUser}
          agent={data.currentUser.role !== 'user'}
          key={'profile-form'}
        />
      )}
    </CustomerLayout>
  );
}
export default Profile;
