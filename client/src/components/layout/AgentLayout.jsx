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
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Ticket'} />
                </ListItemButton>
              </ListItem>
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
