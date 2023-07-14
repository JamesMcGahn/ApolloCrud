import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import BusinessIcon from '@mui/icons-material/Business';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupsIcon from '@mui/icons-material/Groups';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import loggedInUserQ from '../graphql/queries/loggedInUser';
import getUserGroups from '../graphql/queries/getUserGroups';
import AgentLayout from '../components/layout/AgentLayout';
import LinkRouter from '../components/utils/LinkRouter';

const CardList = ({ list, title }) => {
  return (
    <Card
      sx={{
        minWidth: {
          sm: '100%',
          md: '49%',
        },
        marginRight: '1%',
        mt: 3,
        pb: 0,
        '& .MuiListSubheader-root': {
          fontSize: '1.5rem',
          color: 'black',
        },
        '& .MuiList-padding': {
          pb: 0,
        },
      }}
    >
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {title}
          </ListSubheader>
        }
      >
        {list.map((lstItem) => (
          <ListItem
            disablePadding
            sx={{ display: 'flex', width: '100%' }}
            key={lstItem.title}
          >
            <LinkRouter
              to={lstItem.url}
              sx={{ width: '100%' }}
              underline="none"
            >
              <ListItemButton>
                <ListItemIcon>{lstItem.icon}</ListItemIcon>
                <ListItemText primary={lstItem.title} />
              </ListItemButton>
            </LinkRouter>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

function AgentHome() {
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const { data, loading } = useQuery(getUserGroups, {
    variables: { userGroupsId: currentUser.id },
  });

  let userGroups = [];
  if (!loading && data) {
    userGroups = data?.userGroups?.groups.map((grp) => ({
      url: `/agent/dashboard/groups/${grp.id}`,
      title: `${grp.name} Tickets`,
      icon: <GroupsIcon />,
    }));
  }
  return (
    <AgentLayout>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ minWidth: '60vw', minHeight: '40vh', gap: '1rem' }}>
          <CardContent
            sx={{
              flexWrap: 'wrap',
              display: 'flex',
              flexDirection: {
                sm: 'column',
                md: 'row',
              },
            }}
          >
            <CardList
              title="Tickets"
              list={[
                {
                  url: '/agent/dashboard',
                  title: 'My Tickets',
                  icon: <InboxIcon />,
                },
                {
                  url: '/agent/dashboard/unassigned',
                  title: 'Unassigned Tickets',
                  icon: <AssignmentLateIcon />,
                },
                ...userGroups,
              ]}
            />
            <CardList
              title="Users & Companies"
              list={[
                {
                  url: '/agent/users',
                  title: 'Users',
                  icon: <ContactEmergencyIcon />,
                },
                {
                  url: '/agent/companies',
                  title: 'Companies',
                  icon: <BusinessIcon />,
                },
              ]}
            />
            <CardList
              title="Blogs"
              list={[
                {
                  url: '/blog',
                  title: 'Blog',
                  icon: <NewspaperIcon />,
                },
                {
                  url: '/agent/blogs',
                  title: 'Edit Blogs',
                  icon: <ModeEditIcon />,
                },
                {
                  url: '/agent/blogs/create',
                  title: 'Create Blog',
                  icon: <ArticleIcon />,
                },
              ]}
            />
            <CardList
              title="Knowledge Base"
              list={[
                {
                  url: '/agent/knowledge',
                  title: 'Knowledge Articles',
                  icon: <NewspaperIcon />,
                },
                {
                  url: '/agent/articles',
                  title: 'Edit Knowledge Articles',
                  icon: <ModeEditIcon />,
                },
                {
                  url: '/agent/articles/create',
                  title: 'Create Knowledge Article',
                  icon: <ArticleIcon />,
                },
              ]}
            />
          </CardContent>
        </Card>
      </Container>
    </AgentLayout>
  );
}
export default AgentHome;
