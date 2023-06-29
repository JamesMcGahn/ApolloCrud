import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import getTicketSearch from '../graphql/queries/getTicketSearch';
import TicketTable from '../components/tables/TicketTable/TicketTable';
import AgentLayout from '../components/layout/AgentLayout';

function TicketSearch() {
  const [searchParams] = useSearchParams();

  const searchObj = JSON.stringify(Object.fromEntries([...searchParams]));

  const result = searchObj.replace(/[{}"]/g, '');
  const inputString = result;

  const splitParts = [];
  let part = '';
  let withinSingleQuotes = false;

  for (let i = 0; i < inputString.length; i += 1) {
    const char = inputString[i];

    if (char === "'") {
      withinSingleQuotes = !withinSingleQuotes;
    }

    if (char === ',' && !withinSingleQuotes) {
      splitParts.push(part.trim());
      part = '';
    } else {
      part += char;
    }
  }

  splitParts.push(part.trim());

  const cleanedResult = splitParts.join(' ');

  const { loading, data } = useQuery(getTicketSearch, {
    variables: { search: cleanedResult },
  });

  return (
    <AgentLayout>
      <Container>
        {loading ? (
          'loading'
        ) : (
          <TicketTable
            data={data?.ticketsSearch}
            title="Search"
            noTicketsMsg="No Tickets Available. Try Searching again."
          />
        )}
      </Container>
    </AgentLayout>
  );
}
export default TicketSearch;
