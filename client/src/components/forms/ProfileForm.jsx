import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { green, blue } from '@mui/material/colors';
import ProfileGroupSelection from '../ui/ProfileGroupSelection';
import getUserGroup from '../../graphql/queries/getUserGroups';
import updateAUserGroup from '../../graphql/mutations/updateAUserGroups';

function ProfileForm({ handleSubmit, user }) {
  const [userInfo, setUserInfo] = useState(user);
  const [defaultGroupData, setDefaultGroupData] = useState([]);

  const [updateUserGroup, { loading: upLoading }] = useMutation(
    updateAUserGroup,
    {
      onCompleted: (uUg) => {
        if (uUg) {
          setDefaultGroupData(
            uUg?.updateUserGroups?.groups.map((group) => group.name),
          );
        }
      },
    },
  );
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { loading } = useQuery(getUserGroup, {
    variables: { userGroupsId: user.id },
    onCompleted: (ug) => {
      if (ug && ug.userGroups?.groups.length > 0) {
        setDefaultGroupData(ug?.userGroups?.groups.map((group) => group.name));
      }
    },
  });

  const onSubmit = () => {
    if (user.role !== 'user' && user.role !== 'agent') {
      const updateUserGroups = {
        groups: userInfo?.groups,
        userId: userInfo.id,
      };
      updateUserGroup({ variables: { updateUserGroups } });
    }

    handleSubmit(userInfo);
  };

  const handleGroupChange = (selgroup) => {
    const groupIds = selgroup.map((g) => g.id);
    setUserInfo((prev) => ({ ...prev, groups: groupIds }));
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
                bgcolor: userInfo.role === 'user' ? green[500] : blue[500],
                width: 85,
                height: 85,
              }}
              aria-label="avatar"
            >
              {`${userInfo.name[0].toUpperCase()}${
                userInfo.name?.split(' ')[1]
                  ? userInfo.name?.split(' ')[1][0]
                  : ''
              }`}
            </Avatar>
          </Box>
          <Box
            sx={{
              width: '75%',
              padding: '2rem 1rem 0 0',
              maxWidth: '400px',
            }}
          >
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
                sx={{ mb: '1rem' }}
              />
              {!loading && !upLoading && user.role !== 'user' && (
                <ProfileGroupSelection
                  key={`${defaultGroupData.length}-groupSelect`}
                  defaultValue={defaultGroupData}
                  cb={handleGroupChange}
                  disabled={userInfo.role === 'agent'}
                />
              )}
            </FormControl>
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
            <FormControl component="fieldset" variant="standard">
              <FormControlLabel
                sx={{ m: 0 }}
                labelPlacement="start"
                control={
                  <Checkbox
                    name="isActive"
                    checked={userInfo.isActive}
                    disabled
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
