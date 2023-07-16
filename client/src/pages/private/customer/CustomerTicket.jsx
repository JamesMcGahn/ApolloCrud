import { useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import getTicket from '../../../graphql/queries/getTicket';
import CusTicketPageForm from '../../../components/forms/CusTicketPageForm';
import Spinner from '../../../components/ui/LoadingSpinner';
import { TixHistoryContext } from '../../../context/TixHistoryContext';
import TicketHistoryNav from '../../../components/navs/TicketHistoryNav';

function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addHistory } = useContext(TixHistoryContext);

  const { loading, data } = useQuery(getTicket, {
    variables: { ticketId: id },
    onCompleted: () => {
      addHistory({ ticket: id, path: location.pathname });
    },
    onError: (err) => {
      if (err.message === 'We cannot find that Ticket Id') {
        navigate('/404', {
          state: {
            title: 'We Cannot Find That Ticket.',
            message: `We cannot find the Ticket: ${id}. Please make sure you have the right ticket number.`,
          },
        });
      }
    },
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TicketHistoryNav />
          <CusTicketPageForm data={data} key={data?.ticket.id} />
        </>
      )}
    </>
  );
}
export default Ticket;
