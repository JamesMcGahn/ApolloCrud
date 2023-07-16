import { useContext } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import GroupsIcon from '@mui/icons-material/Groups';
import DraftsIcon from '@mui/icons-material/Drafts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HouseIcon from '@mui/icons-material/House';
import DashboardLayout from './DashboardLayout';
import { TixDashTabContext } from '../../context/TixDashTabsContext';
import TicketHistoryNav from '../navs/TicketHistoryNav';
import BreadCrumbs from '../navs/BreadCrumbs';
import LinkRouter from '../utils/LinkRouter';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import getUserGroups from '../../graphql/queries/getUserGroups';
import ProtectedRoute from '../utils/ProtectedRoute';

function Layout() {
  const location = useLocation();
  const match = useMatch('/agent/companies/:id');
  const dashReg = /dashboard/;
  const noBreadCrumbs = match || dashReg.test(location.pathname);

  const { tabStatuses, setCurrentTab } = useContext(TixDashTabContext);
  const handleOnClick = (i) => {
    setCurrentTab(i);
  };

  const { data: udata } = useQuery(loggedInUserQ);
  const { data, loading } = useQuery(getUserGroups, {
    variables: { userGroupsId: udata?.currentUser?.id },
  });

  const knowledgeReg = /knowledge/;
  const noAgentDash = knowledgeReg.test(location.pathname);
  if (noAgentDash) {
    return <ProtectedRoute allowedUser="agent" />;
  }

  return (
    <DashboardLayout
      list={
        <>
          <List>
            <LinkRouter underline="none" to="/">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HouseIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </LinkRouter>
            <LinkRouter underline="none" to="/agent/">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HolidayVillageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Agent Home" />
                </ListItemButton>
              </ListItem>
            </LinkRouter>
          </List>
          <Divider />
          <LinkRouter
            underline="none"
            to="/agent/dashboard/unassigned"
            key="unassigned-nav-item"
            onClick={() => handleOnClick(0)}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentLateIcon />
                </ListItemIcon>
                <ListItemText primary="Unassigned" />
              </ListItemButton>
            </ListItem>
          </LinkRouter>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="My Tickets" />
            </ListItem>
            {tabStatuses.map((status, i) => (
              <LinkRouter
                underline="none"
                to="/agent/dashboard"
                key={`${status}-nav-item`}
                onClick={() => handleOnClick(i)}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {status === 'Solved' && <MarkEmailReadIcon />}
                      {status === 'Open' && <MarkEmailUnreadIcon />}
                      {status === 'New' && <DraftsIcon />}
                      {status === 'Pending' && <ForwardToInboxIcon />}
                      {status === 'Blocked' && <CancelScheduleSendIcon />}
                      {status === 'All' && <InboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={status} />
                  </ListItemButton>
                </ListItem>
              </LinkRouter>
            ))}
          </List>
          <Divider />

          <ListItem>
            <ListItemText primary="My Groups" />
          </ListItem>
          {!loading &&
            data?.userGroups?.groups.map((grp) => {
              return (
                <LinkRouter
                  underline="none"
                  to={`/agent/dashboard/groups/${grp.id}`}
                  key={`${grp.name}-nav-item`}
                  onClick={() => handleOnClick(0)}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <GroupsIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${grp.name}`} />
                    </ListItemButton>
                  </ListItem>
                </LinkRouter>
              );
            })}
        </>
      }
    >
      <TicketHistoryNav />
      {!noBreadCrumbs && <BreadCrumbs />}
      <ProtectedRoute allowedUser="agent" />
    </DashboardLayout>
  );
}
export default Layout;
