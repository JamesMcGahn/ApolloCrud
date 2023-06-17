import AgentLayout from '../components/layout/AgentLayout';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import TicketTable from '../components/TicketTable';
import getMyTickets from '../graphql/queries/getMyTickets';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import Spinner from '../components/ui/LoadingSpinner';
import TicketTabPanel from '../components/navs/TicketTabPanel';

function MyTickets() {
  const { status } = useParams();
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const statusParam = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : null;

  const { loading, error, data } = useQuery(getMyTickets, {
    variables: {
      userId: currentUser.id,
      status: [statusParam],
    },
  });

  return (
    <AgentLayout>
      {loading && <Spinner />}
      <TicketTabPanel />
    </AgentLayout>
  );
}
export default MyTickets;
