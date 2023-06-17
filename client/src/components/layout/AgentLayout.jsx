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

function Layout({ children }) {
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
              <Link to="/agent/dashboard/mytickets">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'My Tickets'} />
                  </ListItemButton>
                </ListItem>
              </Link>
              {['New', 'Open', 'Pending', 'Blocked', 'Closed'].map((status) => (
                <Link
                  to={`/agent/dashboard/mytickets/${status}`}
                  key={`${status}-nav-item`}
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
