import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import updateAUser from '../../graphql/mutations/updateAUser';
import ProfileForm from '../../components/forms/ProfileForm';
import Spinner from '../../components/ui/LoadingSpinner';

function Profile() {
  const { data, loading } = useQuery(loggedInUserQ);

  const [updateUser, { loading: updateLoading, data: updateData }] =
    useMutation(updateAUser, {
      refetchQueries: [{ query: loggedInUserQ }],
      onCompleted: (udata) => {
        toast.success(`User ${udata.updateUser.name} Updated`, {
          theme: 'colored',
        });
      },
      onError(err) {
        toast.error(err.message, {
          theme: 'colored',
        });
      },
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
    <>
      {updateLoading || loading ? (
        <Spinner />
      ) : (
        <ProfileForm
          handleSubmit={handleUpdate}
          user={updateData?.updateUser || data.currentUser}
        />
      )}
    </>
  );
}
export default Profile;
