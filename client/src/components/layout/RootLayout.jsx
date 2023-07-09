import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function RootLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer />
      <ScrollRestoration />
    </>
  );
}
export default RootLayout;
