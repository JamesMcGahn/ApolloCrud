import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import TicketTabPanel from '../../../../components/navs/TicketTabPanel';
import Spinner from '../../../../components/ui/LoadingSpinner';
import getTickets from '../../../../graphql/queries/getTickets';
import bulkDeleteTickets from '../../../../graphql/mutations/bulkDeleteTickets';
import { TixHistoryContext } from '../../../../context/TixHistoryContext';

function GroupsTicket() {
  const { groupId } = useParams();
  const { removeHistory } = useContext(TixHistoryContext);
  const [delLoading, setDelLoading] = useState(false);

  const { loading, data } = useQuery(getTickets, {
    variables: { groupId: groupId },
  });

  const [deleteTickets] = useMutation(bulkDeleteTickets, {
    update(cache, { data: dIds }) {
      const { tickets } = cache.readQuery({
        query: getTickets,
        variables: {
          groupId: groupId,
        },
      });

      cache.writeQuery({
        query: getTickets,
        variables: {
          groupId: groupId,
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
          key={`group-${groupId}`}
          ticketData={data?.tickets}
          loading={loading}
          handleDelete={handleDelete}
          agentTicketLink={`/agent/dashboard/groups/${groupId}/ticket/`}
        />
      )}
    </>
  );
}
export default GroupsTicket;
