import { Outlet, useLocation } from 'react-router-dom';

function CleanOutlet() {
  const location = useLocation();
  console.log(location);
  return <Outlet />;
}
export default CleanOutlet;
