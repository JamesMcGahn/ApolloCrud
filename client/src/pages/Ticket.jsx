import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AgentLayout from '../components/layout/AgentLayout';
import getTicket from '../graphql/queries/getTicket';
import TicketPageForm from '../components/forms/TicketPageForm';
import CusTicketPageForm from '../components/forms/CusTicketPageForm';
import Spinner from '../components/ui/LoadingSpinner';
import { TixHistoryContext } from '../context/TixHistoryContext';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import CustomerLayout from '../components/layout/CustomerLayout';
import TicketHistoryNav from '../components/navs/TicketHistoryNav';
import deleteATicket from '../graphql/mutations/deleteATicket';
import getMyTickets from '../graphql/queries/getMyTickets';

function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addHistory, removeHistory } = useContext(TixHistoryContext);
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

  const [deleteTicket] = useMutation(deleteATicket, {
    onCompleted: () => {
      toast.success(`Ticket ${id} Deleted`);
      removeHistory([id]);
      navigate('/agent/dashboard');
    },
    onError: (error) => {
      toast.error(error);
    },
    update(cache) {
      const tix = cache.readQuery({
        query: getMyTickets,
        variables: { userId: custData.currentUser.id },
      });
      cache.writeQuery({
        query: getMyTickets,
        data: {
          myTickets: tix.myTickets.filter((tixx) => {
            return tixx.id !== id;
          }),
        },
        variables: { userId: custData.currentUser.id },
      });
    },
  });

  const handleDelete = (tixId) => {
    deleteTicket({ variables: { deleteTicketId: tixId } });
  };

  return (
    // trunk-ignore(eslint/react/jsx-no-useless-fragment)
    <>
      {custData?.currentUser.role !== 'user' ? (
        <AgentLayout>
          {loading ? (
            <Spinner />
          ) : (
            <TicketPageForm
              data={data}
              handleDelete={handleDelete}
              key={data?.ticket.id}
            />
          )}
        </AgentLayout>
      ) : (
        <CustomerLayout key={`${id}-ticket`}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <TicketHistoryNav />
              <CusTicketPageForm data={data} key={data?.ticket.id} />
            </>
          )}
        </CustomerLayout>
      )}
    </>
  );
}
export default Ticket;
