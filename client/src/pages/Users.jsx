import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InfoDisplayTable from '../components/tables/InfoDisplayTable';
import Spinner from '../components/ui/LoadingSpinner';
import AgentLayout from '../components/layout/AgentLayout';
import getAllUsers from '../graphql/queries/getAllUser';

const Users = () => {
  const { data, loading } = useQuery(getAllUsers);

  const rows = data?.users
    ? data.users.map((user) => ({
        id: user.id,
        cell1: user.name,
        cell2: user?.company?.name || 'No Company Assigned',
        cell3: user.role,
        cell4: user.email,
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
      label: 'Company',
    },
    {
      id: 'cell3',
      numeric: false,
      disablePadding: false,
      label: 'Role',
    },
    {
      id: 'cell4',
      numeric: false,
      disablePadding: false,
      label: 'Email',
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
                Users
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
              numCellPerRow={4}
              cellLink="/agent/dashboard/users/"
            />
          )}
        </Card>
      </Container>
    </AgentLayout>
  );
};

export default Users;
