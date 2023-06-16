import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AgentLayout from '../components/layout/AgentLayout';
import { useQuery, useMutation } from '@apollo/client';
import getTicket from '../graphql/queries/getTicket';
import TicketForm from '../components/forms/TicketPageForm';

function Ticket() {
  const { id } = useParams();
  const { loading, data } = useQuery(getTicket, {
    variables: { ticketId: id },
  });

  if (loading) return 'loading';
  return loading ? (
    'loading'
  ) : (
    <AgentLayout>
      <TicketForm data={data} />
    </AgentLayout>
  );
}
export default Ticket;
