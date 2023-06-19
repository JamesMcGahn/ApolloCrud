import { useQuery } from '@apollo/client';
import AgentLayout from '../components/layout/AgentLayout';
import getMyTickets from '../graphql/queries/getMyTickets';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import Spinner from '../components/ui/LoadingSpinner';
import TicketTabPanel from '../components/navs/TicketTabPanel';

function MyTickets() {
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const { loading, data } = useQuery(getMyTickets, {
    variables: {
      userId: currentUser.id,
    },
  });
  return (
    <AgentLayout>
      {loading ? (
        <Spinner />
      ) : (
        <TicketTabPanel ticketData={data?.myTickets} loading={loading} />
      )}
    </AgentLayout>
  );
}
export default MyTickets;
