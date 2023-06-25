import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { GeneratePassword } from 'js-generate-password';
import InfoDisplayTable from '../components/tables/InfoDisplayTable';
import Spinner from '../components/ui/LoadingSpinner';
import AgentLayout from '../components/layout/AgentLayout';
import getAllUsers from '../graphql/queries/getAllUser';
import SearchInput from '../components/ui/SearchInput';
import PopModal from '../components/ui/PopModal';
import registerAUser from '../graphql/mutations/registerAUser';

const Users = () => {
  const [rows, setRows] = useState([]);
  const [searchWord, setSearchWord] = useState();
  const [modal, setModal] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    password: '',
    email: '',
    name: '',
    passwordConfirm: '',
  });

  const onChangeHandler = (e) => {
    setRegisterUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (registerUser.password === '') {
      const password = GeneratePassword({
        length: 15,
        symbols: true,
      });

      setRegisterUser((prev) => ({
        ...prev,
        password: password,
        passwordConfirm: password,
      }));
    }
  };

  const [registered, { loading: regLoading }] = useMutation(registerAUser, {
    variables: { createUser: registerUser, agentCreated: true },
    onCompleted: (data) => {
      setModal(false);
      toast.success(`User: ${data.createUser.name} created.`, {
        theme: 'colored',
      });
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
    refetchQueries: [{ query: getAllUsers }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerUser.email && registerUser.name && registerUser.password) {
      registered(registerUser);
      setRegisterUser({
        password: '',
        email: '',
        name: '',
        passwordConfirm: '',
      });
    } else {
      toast.error(
        `Fill the your ${
          // trunk-ignore(eslint/no-nested-ternary)
          !registerUser.email && !registerUser.name
            ? 'email and name.'
            : !registerUser.email
            ? 'email'
            : 'name'
        }`,
        {
          theme: 'colored',
        },
      );
    }
  };

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
                  justifyContent: 'space-between',
                  width: '100%',
                  mb: '.8rem',
                  '& div:first-of-type': {
                    marginLeft: 0,
                  },
                }}
              >
                <SearchInput
                  id="standard-basic"
                  searchWord={searchWord}
                  placeholder="Search by name"
                  cb={handleOnChange}
                  sx={{ paddingLeft: 0 }}
                />
                <PopModal
                  setOpen={setModal}
                  open={modal}
                  buttonText="Create User"
                >
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '300px' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    autoComplete="off"
                  >
                    {regLoading && (
                      <Box
                        sx={{
                          display: 'flex',
                          minWidth: '300px',
                          minHeight: '300px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Spinner />
                      </Box>
                    )}
                    {!regLoading && (
                      <>
                        <Container
                          sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Typography variant="subtitle1" component="h2">
                            Create A New User.
                          </Typography>
                        </Container>
                        <div>
                          <TextField
                            required
                            type="text"
                            id="name"
                            label="Name"
                            name="name"
                            value={registerUser.name}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            type="text"
                            id="email"
                            label="Email"
                            name="email"
                            value={registerUser.email}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          sx={{ width: '300px' }}
                        >
                          Create New User
                        </Button>
                      </>
                    )}
                  </Box>
                </PopModal>
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
