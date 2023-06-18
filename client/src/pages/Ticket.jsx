import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AgentLayout from '../components/layout/AgentLayout';
import getTicket from '../graphql/queries/getTicket';
import TicketForm from '../components/forms/TicketPageForm';
import Spinner from '../components/ui/LoadingSpinner';
import { TixHistoryContext } from '../context/TixHistoryContext';

function Ticket() {
  const { id } = useParams();
  const { addHistory } = useContext(TixHistoryContext);
  const { loading, data } = useQuery(getTicket, {
    variables: { ticketId: id },
    onCompleted: () => {
      addHistory(id);
    },
  });

  return (
    <AgentLayout key={`${id}-ticket`}>
      {loading && <Spinner />}
      {!loading && <TicketForm data={data} />}
    </AgentLayout>
  );
}
export default Ticket;
