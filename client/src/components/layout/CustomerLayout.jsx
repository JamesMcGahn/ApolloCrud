import { useLocation, Outlet } from 'react-router-dom';
import CustomerNav from './CustomerNav';
import BreadCrumbs from '../navs/BreadCrumbs';
import ProtectedRoute from '../utils/ProtectedRoute';

function CustomerLayout() {
  const location = useLocation();
  const dashReg = /dashboard/;
  const privCustReg = /customer/;
  const noBreads = ['/'];
  const noBreadCrumbs =
    noBreads.includes(location.pathname) || dashReg.test(location.pathname);

  const privateCustRoutes = privCustReg.test(location.pathname);
  return (
    <>
      <CustomerNav />
      {!noBreadCrumbs && <BreadCrumbs />}
      {privateCustRoutes ? <ProtectedRoute /> : <Outlet />}
    </>
  );
}
export default CustomerLayout;
