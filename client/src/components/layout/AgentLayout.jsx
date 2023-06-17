import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { TixDashTabContext } from '../../context/TixDashTabsContext';

function Layout({ children }) {
  const { tabStatuses, setCurrentTab } = useContext(TixDashTabContext);
  const handleOnClick = (i) => {
    setCurrentTab(i);
  };

  return (
    <>
      <DashboardLayout
        dwrDefOpen
        list={
          <>
            <List>
              <Link to="/agent/dashboard">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'All Tickets'} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemText primary={'My Tickets'} />
              </ListItem>
              {tabStatuses.map((status, i) => (
                <Link
                  to={`/agent/dashboard/mytickets/`}
                  key={`${status}-nav-item`}
                  onClick={() => handleOnClick(i)}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={status} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </>
        }
      >
        {children}
      </DashboardLayout>
    </>
  );
}
export default Layout;
