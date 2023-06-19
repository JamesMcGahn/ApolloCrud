import CustomerLayout from '../components/layout/CustomerLayout';
import TicketTabPanel from '../components/navs/TicketTabPanel';
import TicketHistoryNav from '../components/navs/TicketHistoryNav';

function CustomerDashboard() {
  return (
    <CustomerLayout>
      <TicketHistoryNav />
      <TicketTabPanel />
    </CustomerLayout>
  );
}
export default CustomerDashboard;
