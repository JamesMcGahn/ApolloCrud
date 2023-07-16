import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CustomerLayout from './CustomerLayout';

function RootLayout() {
  const location = useLocation();
  const agentPath = /agent/;
  const outletOnly = agentPath.test(location.pathname);

  return (
    <>
      {outletOnly ? <Outlet /> : <CustomerLayout />}
      <ToastContainer />
      <ScrollRestoration />
    </>
  );
}
export default RootLayout;
