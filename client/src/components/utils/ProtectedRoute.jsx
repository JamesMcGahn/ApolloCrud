import { Navigate } from 'react-router-dom';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import { useQuery } from '@apollo/client';
import Spinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { loading, error, data } = useQuery(loggedInUserQ);

  if (loading) {
    return <Spinner />;
  }

  if (data?.currentUser.role === 'user') {
    return <Navigate to="/customer" />;
  }

  if (!data?.currentUser) {
    return <Navigate to="/login" />;
  }
  console.log(data);
  return children;
};

export default ProtectedRoute;
