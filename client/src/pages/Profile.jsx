import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CustomerLayout from '../components/layout/CustomerLayout';
import Card from '@mui/material/Card';
import { green, blue } from '@mui/material/colors';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import updateAUser from '../graphql/mutations/updateAUser';
import { Button } from '@mui/material';
import Spinner from '../components/ui/LoadingSpinner';

function Profile() {
  const {
    data: { currentUser },
    loading,
  } = useQuery(loggedInUserQ);
  const [user, setUser] = useState(currentUser);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [updateUser, { data, loading: updateLoading }] = useMutation(
    updateAUser,
    {
      refetchQueries: [{ query: loggedInUserQ }],
    },
  );

  const handleUpdate = () => {
    const userChange = {
      name: user?.name,
      email: user?.email,
    };
    updateUser({
      variables: { updateUserId: user.id, updateUser: userChange },
    });
  };
  console.log(user);
  console.log(currentUser);
  return (
    <CustomerLayout>
      {updateLoading || loading ? (
        <Spinner />
      ) : (
        <Container
          sx={{ pt: '2rem', display: 'flex', justifyContent: 'center' }}
        >
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
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '25%',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: green[500] || blue[500],
                    width: 85,
                    height: 85,
                  }}
                  aria-label="avatar"
                >
                  {currentUser.name[0].toUpperCase()}
                </Avatar>
              </Box>
              <Box sx={{ width: '75%', padding: '2rem 1rem 1rem 0' }}>
                <FormControl fullWidth>
                  <TextField
                    id="user-name"
                    label="Name:"
                    name="name"
                    value={user?.name}
                    onChange={handleChange}
                    sx={{ mb: '1rem' }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    id="user-company"
                    label="Company:"
                    name="company"
                    defaultValue={user?.company?.name || 'No Company Assigned'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}
            >
              <Box sx={{ width: '25%', padding: '1rem' }} />
              <Box sx={{ width: '75%', padding: '.5rem 1rem 1rem 0' }}>
                <FormControl fullWidth>
                  <TextField
                    id="user-email"
                    label="Email:"
                    value={user.email}
                    onChange={handleChange}
                    sx={{ mb: '1rem' }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    id="user-role"
                    label="Role:"
                    name="role"
                    defaultValue={user.role}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
                width: '100%',
                pr: '2rem',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
          </Card>
        </Container>
      )}
    </CustomerLayout>
  );
}
export default Profile;
