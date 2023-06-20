import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function RootLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
}
export default RootLayout;
