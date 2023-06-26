import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AgentLayout from '../components/layout/AgentLayout';
import getTicket from '../graphql/queries/getTicket';
import TicketPageForm from '../components/forms/TicketPageForm';
import CusTicketPageForm from '../components/forms/CusTicketPageForm';
import Spinner from '../components/ui/LoadingSpinner';
import { TixHistoryContext } from '../context/TixHistoryContext';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import CustomerLayout from '../components/layout/CustomerLayout';
import TicketHistoryNav from '../components/navs/TicketHistoryNav';

function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addHistory } = useContext(TixHistoryContext);
  const { data: custData } = useQuery(loggedInUserQ);
  const { loading, data } = useQuery(getTicket, {
    variables: { ticketId: id },
    onCompleted: () => {
      addHistory(id);
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
    // trunk-ignore(eslint/react/jsx-no-useless-fragment)
    <>
      {custData?.currentUser.role !== 'user' ? (
        <AgentLayout>
          {loading ? <Spinner /> : <TicketPageForm data={data} />}
        </AgentLayout>
      ) : (
        <CustomerLayout key={`${id}-ticket`}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <TicketHistoryNav />
              <CusTicketPageForm data={data} />
            </>
          )}
        </CustomerLayout>
      )}
    </>
  );
}
export default Ticket;
