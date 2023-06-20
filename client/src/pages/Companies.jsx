import * as React from 'react';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import getAllCompanies from '../graphql/queries/getAllCompanies';
import InfoDisplayTable from '../components/tables/InfoDisplayTable';
import Spinner from '../components/ui/LoadingSpinner';
import AgentLayout from '../components/layout/AgentLayout';

const Companies = () => {
  const { data, loading } = useQuery(getAllCompanies);

  const rows = data?.companies
    ? data.companies.map((company) => ({
        id: company.id,
        cell1: company.name,
        cell2: company.level,
        cell3: company.id,
      }))
    : [];

  const headCells = [
    {
      id: 'cell1',
      numeric: false,
      disablePadding: false,
      label: 'Name',
    },
    {
      id: 'cell2',
      numeric: false,
      disablePadding: false,
      label: 'Level',
    },
    {
      id: 'cell3',
      numeric: false,
      disablePadding: false,
      label: 'Id',
    },
  ];

  return (
    <AgentLayout>
      <Container sx={{ pt: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minWidth: '40vw',
            minHeight: '60vh',
            padding: '1.5rem',
            flexDirection: 'column',
          }}
        >
          <CardHeader
            title={
              <Typography variant="h4" component="h1">
                Companies
              </Typography>
            }
            sx={{ display: 'flex', justifyContent: 'left', width: '100%' }}
          />
          {loading ? (
            <Spinner />
          ) : (
            <InfoDisplayTable
              rows={rows}
              heads={headCells}
              numCellPerRow={3}
              cellLink="/agent/dashboard/companies/"
            />
          )}
        </Card>
      </Container>
    </AgentLayout>
  );
};

export default Companies;
