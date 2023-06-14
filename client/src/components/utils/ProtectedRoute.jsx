import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import { useQuery } from '@apollo/client';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState();
  const { loading, error, data } = useQuery(loggedInUserQ, {
    onCompleted: (data) => {
      setUser(data.currentUser);
    },
  });

  if (user?.role === 'user' && !loading) {
    return <Navigate to="/customer" />;
  }

  if (error || (!user && !user?.role && !loading)) {
    console.log(error);
    return <Navigate to="/login" />;
  }
  if (!loading) {
    return children;
  }
};

export default ProtectedRoute;
