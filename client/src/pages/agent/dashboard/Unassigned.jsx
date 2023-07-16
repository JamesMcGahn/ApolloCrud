import { useQuery, useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import getTickets from '../../../graphql/queries/getTickets';
import Spinner from '../../../components/ui/LoadingSpinner';
import TicketTabPanel from '../../../components/navs/TicketTabPanel';
import bulkDeleteTickets from '../../../graphql/mutations/bulkDeleteTickets';
import { TixHistoryContext } from '../../../context/TixHistoryContext';

function Unassigned() {
  const { removeHistory } = useContext(TixHistoryContext);
  const [delLoading, setDelLoading] = useState(false);
  const { loading, data } = useQuery(getTickets, {
    variables: {
      unassigned: true,
    },
  });

  const [deleteTickets] = useMutation(bulkDeleteTickets, {
    update(cache, { data: dIds }) {
      const { tickets } = cache.readQuery({
        query: getTickets,
        variables: {
          unassigned: true,
        },
      });

      cache.writeQuery({
        query: getTickets,
        variables: {
          unassigned: true,
        },
        data: {
          tickets: tickets.filter(
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
    <>
      {loading || delLoading ? (
        <Spinner />
      ) : (
        <TicketTabPanel
          ticketData={data?.tickets}
          loading={loading}
          handleDelete={handleDelete}
          agentTicketLink="/agent/dashboard/unassigned/ticket/"
        />
      )}
    </>
  );
}
export default Unassigned;
