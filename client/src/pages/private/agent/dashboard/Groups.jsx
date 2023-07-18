import { useQuery } from '@apollo/client';
import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import getUserGroups from '../../../../graphql/queries/getUserGroups';
import loggedInUserQ from '../../../../graphql/queries/loggedInUser';
import LinkRouter from '../../../../components/utils/LinkRouter';
import Spinner from '../../../../components/ui/LoadingSpinner';

function Groups() {
  const { data: udata } = useQuery(loggedInUserQ);
  const { data, loading } = useQuery(getUserGroups, {
    variables: { userGroupsId: udata?.currentUser?.id },
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '80vw',
        alignItems: 'center',
        mt: '1rem',
      }}
    >
      <Box
        sx={{
          padding: '1.5rem',
          borderRadius: '.5rem',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          width: '60%',
          mb: 1,
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          My Groups
        </Typography>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            padding: '1.5rem',
            gap: '1rem',
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <List sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
              {data?.userGroups?.groups.map((grp) => (
                <ListItem disablePadding key={grp.name} sx={{ width: '50%' }}>
                  <LinkRouter
                    to={`/agent/dashboard/groups/${grp.id}`}
                    underline="none"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <GroupsIcon />
                      </ListItemIcon>
                      <ListItemText primary={grp.name} />
                    </ListItemButton>
                  </LinkRouter>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default Groups;
