import { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import updateBulkTicket from '../../graphql/mutations/updateTickets';
import AgentTicketForm from './AgentTicketForm';
import CusTicketForm from './CusTicketForm';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import getTickets from '../../graphql/queries/getTickets';
import getMyTickets from '../../graphql/queries/getMyTickets';
import { TixDashTabContext } from '../../context/TixDashTabsContext';

function BulkTicketEdit({ ids, closeModal }) {
  const { setCurrentTab, currentTab, tabStatuses } =
    useContext(TixDashTabContext);
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const [updateTickets] = useMutation(updateBulkTicket, {
    onCompleted: (data) => {
      const updated = tabStatuses.indexOf(data.updateTickets[0].status);
      const change = updated === currentTab ? 0 : updated;
      setCurrentTab(change || 0);
      toast.success('Ticket(s) Updated', {
        theme: 'colored',
      });
      closeModal(false);
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
    refetchQueries: [
      { query: getTickets },
      { query: getMyTickets, variables: { userId: currentUser.id } },
    ],
  });

  const handleSubmit = (submittedUpdate) => {
    updateTickets({
      variables: { updateTickets: submittedUpdate, ids: ids },
    });
  };

  return (
    // trunk-ignore(eslint/react/jsx-no-useless-fragment)
    <>
      {currentUser.role === 'user' ? (
        <CusTicketForm
          handleSubmitCb={handleSubmit}
          formTitle="Edit Ticket(s)."
          createForm={false}
        />
      ) : (
        <AgentTicketForm
          handleSubmitCb={handleSubmit}
          formTitle="Edit Ticket(s)."
          createForm={false}
        />
      )}
    </>
  );
}
export default BulkTicketEdit;
