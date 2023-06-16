import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import updateBulkTicket from '../../graphql/mutations/updateTickets';
import TicketForm from './TicketForm';

function BulkTicketEdit({ ids, closeModal }) {
  const [updateTickets] = useMutation(updateBulkTicket, {
    onCompleted: (data) => {
      toast.success('Ticket Updated', {
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

  const handleSubmit = (submittedUpdate) => {
    console.log(submittedUpdate);
    updateTickets({
      variables: { updateTickets: submittedUpdate, ids: ids },
    });
  };

  return (
    <TicketForm
      handleSubmitCb={handleSubmit}
      formTitle="Create Ticket."
      createForm={false}
    />
  );
}
export default BulkTicketEdit;
