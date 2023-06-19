import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import createATicket from '../../graphql/mutations/createATicket';
import AgentTicketForm from './AgentTicketForm';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import CusTicketForm from './CusTicketForm';

function CreateTicketForm({ closeModal }) {
  const navigate = useNavigate();
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const [creatTicket] = useMutation(createATicket, {
    onCompleted: (data) => {
      const ticket = data.createTicket;

      toast.success('Ticket Created', {
        theme: 'colored',
      });
      closeModal(false);
      navigate(
        currentUser.role === 'user'
          ? `/customer/dashboard/ticket/${ticket.id}`
          : `/agent/dashboard/ticket/${ticket.id}`,
      );
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const handleSubmit = (submittedTicket) => {
    if (
      !submittedTicket.requester ||
      !submittedTicket.title ||
      !submittedTicket.description
    ) {
      toast.error('Requester, Title & Description are required', {
        theme: 'colored',
      });
      return;
    }
    creatTicket({
      variables: { newTicket: submittedTicket },
    });
  };

  return (
    // trunk-ignore(eslint/react/jsx-no-useless-fragment)
    <>
      {currentUser.role === 'user' ? (
        <CusTicketForm
          handleSubmitCb={handleSubmit}
          formTitle="Create Ticket."
          createForm
        />
      ) : (
        <AgentTicketForm
          handleSubmitCb={handleSubmit}
          formTitle="Create Ticket."
          createForm
        />
      )}
    </>
  );
}
export default CreateTicketForm;
