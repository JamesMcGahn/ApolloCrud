import { useLocation } from 'react-router-dom';
import CustomerNav from './CustomerNav';
import BreadCrumbs from '../navs/BreadCrumbs';

function CustomerLayout({ children }) {
  const location = useLocation();
  const dashReg = /dashboard/;
  const noBreads = ['/'];
  const noBreadCrumbs =
    noBreads.includes(location.pathname) || dashReg.test(location.pathname);
  return (
    <>
      <CustomerNav />
      {!noBreadCrumbs && <BreadCrumbs />}
      {children}
    </>
  );
}
export default CustomerLayout;
