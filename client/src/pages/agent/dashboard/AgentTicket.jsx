import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import getTicket from '../../../graphql/queries/getTicket';
import TicketPageForm from '../../../components/forms/TicketPageForm';
import Spinner from '../../../components/ui/LoadingSpinner';
import { TixHistoryContext } from '../../../context/TixHistoryContext';
import loggedInUserQ from '../../../graphql/queries/loggedInUser';
import deleteATicket from '../../../graphql/mutations/deleteATicket';
import getMyTickets from '../../../graphql/queries/getMyTickets';

function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addHistory, removeHistory } = useContext(TixHistoryContext);
  const { data: custData } = useQuery(loggedInUserQ);
  const { loading, data, refetch } = useQuery(getTicket, {
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

  const [updateComment] = useMutation(
    gql`
      mutation Mutation($ticketCommentIntId: ID!, $ticketId: ID!) {
        ticketCommentInt(id: $ticketCommentIntId, ticketId: $ticketId)
      }
    `,
    {
      onCompleted: () => {
        toast.success('Comment Updated to Private');
        refetch({ ticketId: id });
      },
    },
  );

  const handleCommentInteral = (commID) => {
    updateComment({
      variables: { ticketCommentIntId: commID, ticketId: id },
    });
  };

  const handleDelete = (tixId) => {
    deleteTicket({ variables: { deleteTicketId: tixId } });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <TicketPageForm
          data={data}
          handleDelete={handleDelete}
          key={`${data?.ticket.id}-${data?.ticket?.history?.length}`}
          handleCommentInteral={handleCommentInteral}
        />
      )}
    </>
  );
}
export default Ticket;
