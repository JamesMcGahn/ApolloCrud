import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AgentLayout from '../components/layout/AgentLayout';
import { useQuery, useMutation } from '@apollo/client';
import getTicket from '../graphql/queries/getTicket';
import TicketForm from '../components/forms/TicketPageForm';
import Spinner from '../components/ui/LoadingSpinner';

function Ticket() {
  const { id } = useParams();
  const { loading, data } = useQuery(getTicket, {
    variables: { ticketId: id },
  });

  return (
    <AgentLayout>
      {loading && <Spinner />}
      {!loading && <TicketForm data={data} />}
    </AgentLayout>
  );
}
export default Ticket;
