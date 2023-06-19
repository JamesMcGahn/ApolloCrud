import { useQuery } from '@apollo/client';
import AgentLayout from '../components/layout/AgentLayout';
import getTickets from '../graphql/queries/getTickets';
import TicketTable from '../components/TicketTable';

function AgentHome() {
  const { loading, data } = useQuery(getTickets);

  return (
    <AgentLayout>
      {!loading && <TicketTable data={data?.tickets} />}
    </AgentLayout>
  );
}
export default AgentHome;
