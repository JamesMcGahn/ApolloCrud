import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import createATicket from '../../graphql/mutations/createATicket';
import TicketForm from './TicketForm';

function CreateTicketForm({ closeModal }) {
  const [creatTicket] = useMutation(createATicket, {
    onCompleted: (data) => {
      toast.success('Ticket Created', {
        theme: 'colored',
      });
      closeModal(false);
    },
    onError(err) {
      console.log(err);
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
    <TicketForm
      handleSubmitCb={handleSubmit}
      formTitle="Create Ticket."
      createForm
    />
  );
}
export default CreateTicketForm;
