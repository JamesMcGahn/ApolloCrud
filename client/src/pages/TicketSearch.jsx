import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import getTickets from '../graphql/queries/getTickets';
import TicketTable from '../components/tables/TicketTable/TicketTable';
import AgentLayout from '../components/layout/AgentLayout';

function TicketSearch() {
  const [searchParams] = useSearchParams();
  const [aTickets, setATickets] = useState([]);
  const [params, setParams] = useState();

  const filterTixs = (tixData) => {
    let tickets = tixData;

    if (params?.title) {
      tickets = tickets?.filter((tix) => {
        const { title } = tix;
        return title.toLowerCase().search(params.title.toLowerCase()) !== -1;
      });
    }

    if (params?.ticket) {
      tickets = tickets.filter((tix) => tix.id === params.ticket);
    }

    if (params?.status) {
      tickets = tickets?.filter(
        (tix) => tix.status.toLowerCase() === params.status.toLowerCase(),
      );
    }

    if (params?.priority) {
      tickets = tickets?.filter(
        (tix) => tix.priority.toLowerCase() === params.priority.toLowerCase(),
      );
    }

    if (params?.requester) {
      tickets = tickets?.filter((tix) => {
        return (
          tix.requester?.name
            .toLowerCase()
            .search(params.requester.toLowerCase()) !== -1 ||
          tix.requester?.email.toLowerCase() === params.requester.toLowerCase()
        );
      });
    }

    if (params?.assignee) {
      tickets = tickets?.filter((tix) => {
        return (
          tix.assignee?.name
            .toLowerCase()
            .search(params.assignee.toLowerCase()) !== -1 ||
          tix.assignee?.email.toLowerCase() === params.assignee.toLowerCase()
        );
      });
    }

    if (params?.company) {
      tickets = tickets?.filter((tix) => {
        return (
          tix?.assignee?.company?.name.toLowerCase() ===
            params.company.toLowerCase() ||
          tix?.requester?.company?.name.toLowerCase() ===
            params.company.toLowerCase()
        );
      });
    }
    return tickets;
  };

  const { loading, data } = useQuery(getTickets, {
    onCompleted: (tData) => {
      setATickets(filterTixs(tData.tickets));
    },
  });

  useEffect(() => {
    setParams(Object.fromEntries([...searchParams]));
  }, [searchParams]);

  useEffect(() => {
    if (params && data) {
      setATickets(filterTixs(data.tickets));
    }
  }, [params]);

  return (
    <AgentLayout>
      <Container>
        {loading ? (
          'loading'
        ) : (
          <TicketTable
            data={aTickets}
            key={`${aTickets[0]?.id || 'no-tickets'}${JSON.stringify(
              aTickets,
            )}`}
            title="Search"
          />
        )}
      </Container>
    </AgentLayout>
  );
}
export default TicketSearch;
