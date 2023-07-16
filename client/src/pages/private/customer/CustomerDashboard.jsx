import { useQuery } from '@apollo/client';
import TicketTabPanel from '../../../components/navs/TicketTabPanel';
import TicketHistoryNav from '../../../components/navs/TicketHistoryNav';
import getMyTickets from '../../../graphql/queries/getMyTickets';
import loggedInUserQ from '../../../graphql/queries/loggedInUser';
import Spinner from '../../../components/ui/LoadingSpinner';

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
    <>
      <TicketHistoryNav />
      {loading ? (
        <Spinner />
      ) : (
        <TicketTabPanel ticketData={data?.myTickets} customer />
      )}
    </>
  );
}
export default CustomerDashboard;
