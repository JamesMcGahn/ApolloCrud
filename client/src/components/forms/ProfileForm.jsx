import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { green, blue } from '@mui/material/colors';

function ProfileForm({ handleSubmit, user, agent }) {
  const [userInfo, setUserInfo] = useState(user);
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = () => {
    handleSubmit(userInfo);
  };

  return (
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
              {userInfo.name[0].toUpperCase()}
            </Avatar>
          </Box>
          <Box sx={{ width: '75%', padding: '2rem 1rem 1rem 0' }}>
            <FormControl fullWidth>
              <TextField
                id="user-name"
                label="Name:"
                name="name"
                value={userInfo?.name}
                onChange={handleChange}
                sx={{ mb: '1rem' }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="user-company"
                label="Company:"
                name="company"
                defaultValue={userInfo?.company?.name || 'No Company Assigned'}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Box sx={{ width: '25%', padding: '1rem' }} />
          <Box sx={{ width: '75%', padding: '.5rem 1rem 1rem 0' }}>
            <FormControl fullWidth>
              <TextField
                id="user-email"
                label="Email:"
                value={userInfo.email}
                onChange={handleChange}
                sx={{ mb: '1rem' }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="user-role"
                label="Role:"
                name="role"
                defaultValue={userInfo.role}
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
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Update
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
export default ProfileForm;
