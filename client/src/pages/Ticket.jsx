import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import getTicket from '../graphql/queries/getTicket';
import TicketForm from './TicketForm';

function Ticket() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getTicket, {
    variables: { ticketId: id },
  });

  console.log(data);
  if (loading) return 'loading';
  return loading ? 'loading' : <TicketForm data={data} />;
}
export default Ticket;
