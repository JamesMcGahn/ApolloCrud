import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InfoDisplayTable from '../components/tables/InfoDisplayTable';
import Spinner from '../components/ui/LoadingSpinner';
import AgentLayout from '../components/layout/AgentLayout';
import getAllUsers from '../graphql/queries/getAllUser';
import SearchInput from '../components/ui/SearchInput';

const Users = () => {
  const [rows, setRows] = useState([]);
  const [searchWord, setSearchWord] = useState();
  const searchBy = (userData) => {
    let users = userData;

    if (/\S/.test(searchWord) && searchWord) {
      users = userData?.filter((user) => {
        const { name } = user;

        return name.toLowerCase().search(searchWord.toLowerCase()) !== -1;
      });
    }

    const readyRows = users.map((user) => ({
      id: user.id,
      cell1: user.name,
      cell2: {
        link: true,
        display: user?.company?.name || 'No Company Assigned',
        path: user?.company
          ? `/agent/dashboard/companies/${user.company.id}`
          : `/agent/dashboard/users/${user.id}`,
      },
      cell3: user.role,
      cell4: user.email,
      cell5: user.isActive ? 'Active' : 'Disabled',
    }));

    setRows(readyRows);
  };

  const { data, loading } = useQuery(getAllUsers, {
    onCompleted: (uData) => {
      searchBy(uData.users);
    },
  });

  useEffect(() => {
    if (!loading) {
      searchBy(data?.users);
    }
  }, [searchWord]);

  const handleOnChange = (word) => {
    setSearchWord(word);
  };

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
    {
      id: 'cell5',
      numeric: false,
      disablePadding: false,
      label: 'Active:',
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
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  mb: '.5rem',
                }}
              >
                <SearchInput
                  id="standard-basic"
                  searchWord={searchWord}
                  placeholder="Search by name"
                  cb={handleOnChange}
                />
              </Box>
              <InfoDisplayTable
                rows={rows}
                heads={headCells}
                numCellPerRow={5}
                cellLink="/agent/dashboard/users/"
              />
            </>
          )}
        </Card>
      </Container>
    </AgentLayout>
  );
};

export default Users;
