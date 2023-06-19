import { useQuery } from '@apollo/client';
import AgentLayout from '../components/layout/AgentLayout';
import getTickets from '../graphql/queries/getTickets';
import TicketTabPanel from '../components/navs/TicketTabPanel';

function AgentHome() {
  const { loading, data } = useQuery(getTickets);

  return (
    <AgentLayout>
      {!loading && (
        <TicketTabPanel ticketData={data?.tickets} loading={loading} />
      )}
    </AgentLayout>
  );
}
export default AgentHome;
