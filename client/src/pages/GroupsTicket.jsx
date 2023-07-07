import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import AgentLayout from '../components/layout/AgentLayout';
import TicketTabPanel from '../components/navs/TicketTabPanel';
import Spinner from '../components/ui/LoadingSpinner';
import getTickets from '../graphql/queries/getTickets';

function GroupsTicket() {
  const { id } = useParams();

  const { loading, data } = useQuery(getTickets, {
    variables: { groupId: id },
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
export default GroupsTicket;
