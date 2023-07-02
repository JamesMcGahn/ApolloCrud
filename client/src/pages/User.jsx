import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import AgentLayout from '../components/layout/AgentLayout';
import getUser from '../graphql/queries/getUser';
import updateAUser from '../graphql/mutations/updateAUser';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import UserProfileForm from '../components/forms/UserProfileForm';
import Spinner from '../components/ui/LoadingSpinner';
import getACompany from '../graphql/queries/getACompany';

function User() {
  const { userId } = useParams();
  const { data: currUser } = useQuery(loggedInUserQ);
  const navigate = useNavigate();
  const { data, loading } = useQuery(getUser, {
    variables: { userId: userId },
    onError: (error) => {
      if (error?.graphQLErrors) {
        if (error?.graphQLErrors[0]?.extensions.code === 'CASTE_ERROR') {
          navigate('/404', {
            state: {
              title: 'We Cannot Find That User.',
              message: `We cannot find the User with the ID of ${userId}. Please make sure you have the right link.`,
            },
          });
          return;
        }
      }

      toast.error(error.message, {
        theme: 'colored',
      });
    },
  });

  const [updateUser, { loading: updateLoading, data: updateData }] =
    useMutation(updateAUser, {
      onCompleted: (udata) => {
        toast.success(`User ${udata.updateUser.name} Updated`, {
          theme: 'colored',
        });
      },
      onError: (err) => {
        toast.error(err.message, {
          theme: 'colored',
        });
      },
    });

  const handleUpdate = (user) => {
    const userChange = {
      name: user?.name,
      email: user?.email,
      company: user?.company?.id === 'Remove' ? null : user?.company?.id,
      role: currUser?.currentUser.role === 'admin' ? user?.role : undefined,
      isActive: user?.isActive,
    };
    updateUser({
      variables: { updateUserId: userId, updateUser: userChange },
      refetchQueries: [
        { query: getUser, variables: { userId: userId } },
        {
          query: getACompany,
          variables: {
            companyId: data?.user?.company?.id,
          },
        },
        {
          query: getACompany,
          variables: {
            companyId: user?.company?.id,
          },
        },
      ],
    });
  };

  return (
    <AgentLayout>
      {updateLoading || loading ? (
        <Spinner />
      ) : (
        <UserProfileForm
          handleSubmit={handleUpdate}
          user={updateData?.updateUser || data.user}
          agentRole={currUser?.currentUser.role}
        />
      )}
    </AgentLayout>
  );
}
export default User;
