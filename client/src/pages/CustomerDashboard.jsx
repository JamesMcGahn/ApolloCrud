import { useQuery } from '@apollo/client';
import CustomerLayout from '../components/layout/CustomerLayout';
import TicketTabPanel from '../components/navs/TicketTabPanel';
import TicketHistoryNav from '../components/navs/TicketHistoryNav';
import getMyTickets from '../graphql/queries/getMyTickets';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import Spinner from '../components/ui/LoadingSpinner';

function CustomerDashboard() {
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const { loading, data } = useQuery(getMyTickets, {
    variables: {
      userId: currentUser.id,
    },
  });

  return (
    <CustomerLayout>
      <TicketHistoryNav />
      {loading ? <Spinner /> : <TicketTabPanel ticketData={data?.myTickets} />}
    </CustomerLayout>
  );
}
export default CustomerDashboard;
