import { useQuery, useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import AgentLayout from '../components/layout/AgentLayout';
import getMyTickets from '../graphql/queries/getMyTickets';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import Spinner from '../components/ui/LoadingSpinner';
import TicketTabPanel from '../components/navs/TicketTabPanel';
import bulkDeleteTickets from '../graphql/mutations/bulkDeleteTickets';
import { TixHistoryContext } from '../context/TixHistoryContext';

function AgentDashboard() {
  const { removeHistory } = useContext(TixHistoryContext);
  const [delLoading, setDelLoading] = useState(false);
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const { loading, data } = useQuery(getMyTickets, {
    variables: {
      userId: currentUser.id,
    },
  });

  const [deleteTickets] = useMutation(bulkDeleteTickets, {
    update(cache, { data: dIds }) {
      const { myTickets } = cache.readQuery({
        query: getMyTickets,
        variables: {
          userId: currentUser.id,
        },
      });

      cache.writeQuery({
        query: getMyTickets,
        variables: {
          userId: currentUser.id,
        },
        data: {
          myTickets: myTickets.filter(
            (tix) => !dIds.deleteTickets.includes(tix.id),
          ),
        },
      });
      removeHistory(dIds.deleteTickets);
      setDelLoading(false);
    },
  });

  const handleDelete = (ids) => {
    setDelLoading(true);

    deleteTickets({ variables: { deleteTicketsId: ids } });
  };

  return (
    <AgentLayout>
      {loading || delLoading ? (
        <Spinner />
      ) : (
        <TicketTabPanel
          ticketData={data?.myTickets}
          loading={loading}
          handleDelete={handleDelete}
        />
      )}
    </AgentLayout>
  );
}
export default AgentDashboard;
