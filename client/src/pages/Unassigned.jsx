import { useQuery } from '@apollo/client';
import AgentLayout from '../components/layout/AgentLayout';
import getTickets from '../graphql/queries/getTickets';
import Spinner from '../components/ui/LoadingSpinner';
import TicketTabPanel from '../components/navs/TicketTabPanel';

function Unassigned() {
  const { loading, data } = useQuery(getTickets, {
    variables: {
      unassigned: true,
    },
  });
  return (
    <AgentLayout>
      {loading ? (
        <Spinner />
      ) : (
        <TicketTabPanel ticketData={data?.tickets} loading={loading} />
      )}
    </AgentLayout>
  );
}
export default Unassigned;
