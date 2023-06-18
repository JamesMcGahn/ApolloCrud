import { useQuery } from '@apollo/client';
import { Navigate, Outlet } from 'react-router-dom';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import Spinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children, allowedUser }) => {
  const { loading, data } = useQuery(loggedInUserQ);

  if (loading) {
    return <Spinner />;
  }

  if (!data?.currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedUser === 'agent' && data?.currentUser.role === 'user') {
    return <Navigate to="/customer" />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
