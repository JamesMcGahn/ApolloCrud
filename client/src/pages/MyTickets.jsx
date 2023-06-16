import AgentLayout from '../components/layout/AgentLayout';
import { useQuery } from '@apollo/client';
import TicketTable from '../components/TicketTable';
import getMyTickets from '../graphql/queries/getMyTickets';
import loggedInUserQ from '../graphql/queries/loggedInUser';

function MyTickets() {
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const { loading, error, data } = useQuery(getMyTickets, {
    variables: { userId: currentUser.id },
  });
  console.log(data);

  return (
    <AgentLayout>
      {!loading && <TicketTable data={data?.myTickets} />}
    </AgentLayout>
  );
}
export default MyTickets;
