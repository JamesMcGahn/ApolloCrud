import { useLocation, useMatch, Outlet } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import CategoryIcon from '@mui/icons-material/Category';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HouseIcon from '@mui/icons-material/House';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import DashboardLayout from './DashboardLayout';
import TicketHistoryNav from '../navs/TicketHistoryNav';
import BreadCrumbs from '../navs/BreadCrumbs';
import LinkRouter from '../utils/LinkRouter';
import loggedInUserQ from '../../graphql/queries/loggedInUser';

function Layout({ children }) {
  const location = useLocation();
  const match = useMatch('/agent/companies/:id');
  const dashReg = /dashboard/;
  const noBreadCrumbs = match || dashReg.test(location.pathname);

  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const { data, loading } = useQuery(
    gql`
      query Query {
        articlesCategories
      }
    `,
    {
      variables: { userGroupsId: currentUser.id },
    },
  );

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
            <LinkRouter
              underline="none"
              to={currentUser.role !== 'user' ? '/agent' : '/user'}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HolidayVillageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${
                      currentUser.role !== 'user' ? 'Agent' : 'Customer'
                    } Home`}
                  />
                </ListItemButton>
              </ListItem>
            </LinkRouter>

            <LinkRouter
              underline="none"
              to={`${
                currentUser.role !== 'user' ? '/agent' : '/user'
              }/knowledge`}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NewspaperIcon />
                  </ListItemIcon>
                  <ListItemText primary="Knowledge Home" />
                </ListItemButton>
              </ListItem>
            </LinkRouter>
          </List>
          <Divider />
          {currentUser.role !== 'user' && (
            <>
              <LinkRouter underline="none" to="/agent/knowledge/articles">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ModeEditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </ListItemButton>
                </ListItem>
              </LinkRouter>
              <LinkRouter underline="none" to="/agent/knowledge/create">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create" />
                  </ListItemButton>
                </ListItem>
              </LinkRouter>
              <Divider />
            </>
          )}
          <LinkRouter
            underline="none"
            to={`${
              currentUser.role !== 'user' ? '/agent' : '/user'
            }/knowledge/tags`}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary="Tags" />
              </ListItemButton>
            </ListItem>
          </LinkRouter>
          <Divider />
          <LinkRouter
            underline="none"
            to={`${
              currentUser.role !== 'user' ? '/agent' : '/user'
            }/knowledge/categories`}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>
          </LinkRouter>

          {!loading &&
            data?.articlesCategories?.map((cat) => {
              return (
                <LinkRouter
                  underline="none"
                  to={`/agent/knowledge/categories/${cat}`}
                  key={`${cat}-nav-item`}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <CategoryIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${cat}`} />
                    </ListItemButton>
                  </ListItem>
                </LinkRouter>
              );
            })}
          <Divider />
        </>
      }
    >
      <TicketHistoryNav />
      {!noBreadCrumbs && <BreadCrumbs />}

      {Outlet ? <Outlet /> : { children }}
    </DashboardLayout>
  );
}
export default Layout;
