import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import AgentLayout from '../components/layout/AgentLayout';
import getUser from '../graphql/queries/getUser';
import updateAUser from '../graphql/mutations/updateAUser';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import ProfileForm from '../components/forms/ProfileForm';
import Spinner from '../components/ui/LoadingSpinner';

function User() {
  const { id } = useParams();
  const { data: currUser } = useQuery(loggedInUserQ);
  const { data, loading } = useQuery(getUser, {
    variables: { userId: id },
  });

  const [updateUser, { loading: updateLoading, data: updateData }] =
    useMutation(updateAUser, {
      refetchQueries: [{ query: getUser, variables: { userId: id } }],
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
    <AgentLayout>
      {updateLoading || loading ? (
        <Spinner />
      ) : (
        <ProfileForm
          handleSubmit={handleUpdate}
          user={updateData?.updateUser || data.user}
          agentRole={currUser?.currentUser.role}
        />
      )}
    </AgentLayout>
  );
}
export default User;
