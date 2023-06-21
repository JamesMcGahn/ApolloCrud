import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { green, blue } from '@mui/material/colors';
import UserSelectionList from '../ui/UserSelectionList';
import getCompanies from '../../graphql/queries/getAllCompanies';
import Spinner from '../ui/LoadingSpinner';

function ProfileForm({ handleSubmit, user, agentRole }) {
  const [userInfo, setUserInfo] = useState(user);

  const handleSelect = (company) => {
    setUserInfo((prev) => ({ ...prev, company: company }));
  };
  const { data: dataCom, loading: loadingCom } = useQuery(getCompanies);

  const handleRole = (role) => {
    setUserInfo((prev) => ({ ...prev, role: role.name }));
  };

  const handleChange = (e) => {
    if (e.target.name === 'isActive') {
      setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
      return;
    }
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = () => {
    handleSubmit(userInfo);
  };

  const roles = ['user', 'agent', 'lead', 'admin'].map((n) => ({
    id: n,
    name: n,
  }));

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
                bgcolor: userInfo.role === 'user' ? green[500] : blue[500],
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
            {!agentRole && (
              <FormControl fullWidth>
                <TextField
                  id="user-company"
                  label="Company:"
                  name="company"
                  defaultValue={
                    userInfo?.company?.name || 'No Company Assigned'
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            )}
            {loadingCom ? (
              <Spinner />
            ) : (
              <>
                <InputLabel
                  htmlFor="Selection-List"
                  sx={{ fontSize: '.7rem', pl: '.8rem' }}
                >
                  Company:
                </InputLabel>

                <UserSelectionList
                  selectionList={dataCom?.companies}
                  valueBy="name"
                  cb={handleSelect}
                  defaultValue={userInfo.company?.name}
                  sxStyles={{ width: '100%', mb: '0' }}
                />
              </>
            )}
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
            {agentRole === 'admin' ? (
              <>
                <InputLabel
                  sx={{ fontSize: '.7rem', pl: '.8rem' }}
                  htmlFor="Selection-List"
                >
                  Role:
                </InputLabel>
                <UserSelectionList
                  selectionList={roles}
                  valueBy="name"
                  cb={handleRole}
                  defaultValue={userInfo?.role}
                  sxStyles={{ width: '100%', mb: '1rem' }}
                />
              </>
            ) : (
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
            )}
            <FormControl component="fieldset" variant="standard">
              <FormControlLabel
                labelPlacement="start"
                sx={{ m: 0 }}
                control={
                  <Checkbox
                    name="isActive"
                    checked={userInfo.isActive}
                    onChange={handleChange}
                  />
                }
                label="User Active:"
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
