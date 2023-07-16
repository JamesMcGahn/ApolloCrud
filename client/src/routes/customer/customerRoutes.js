import { Route } from 'react-router-dom';
import CleanOutlet from '../../components/layout/CleanOutlet';
import CustomerHome from '../../pages/private/customer/CustomerHome';
import CustomerDashboard from '../../pages/private/customer/CustomerDashboard';
import TicketReview from '../../pages/private/customer/TicketReview';
import CustomerTicket from '../../pages/private/customer/CustomerTicket';
import Profile from '../../pages/private/Profile';

const customerRoutes = (
  <Route path="customer" element={<CleanOutlet />}>
    <Route path="" element={<CustomerHome />} />
    <Route path="profile" element={<Profile />} />
    <Route path="dashboard" element={<CleanOutlet />}>
      <Route path="" element={<CustomerDashboard />} />
      <Route path="ticket/:id" element={<CustomerTicket />} />
      <Route path="ticket/:id/feedback" element={<TicketReview />} />
    </Route>
  </Route>
);

export default customerRoutes;
