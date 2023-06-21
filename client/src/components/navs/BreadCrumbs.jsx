import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useQuery } from '@apollo/client';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import getUser from '../../graphql/queries/getUser';
import getACompany from '../../graphql/queries/getACompany';

const userBread = ({ match }) => {
  const { id } = match.params;
  const { data } = useQuery(getUser, { variables: { userId: id } });
  return data?.user.name;
};
const comanyBread = ({ match }) => {
  const { id } = match.params;
  const { data } = useQuery(getACompany, { variables: { companyId: id } });
  return data?.company.name;
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

function BreadCrumbs() {
  const routes = [
    { path: '/agent', breadcrumb: 'Agent Home' },
    { path: '/agent/dashboard/mytickets', breadcrumb: 'My Tickets' },
    { path: '/agent/dashboard/ticket/', breadcrumb: null },
    { path: '/agent/dashboard/users/:id', breadcrumb: userBread },
    { path: '/agent/dashboard/companies/:id', breadcrumb: comanyBread },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  const last = breadcrumbs.length - 1;
  return (
    <Container sx={{ padding: '.5rem 0 .5rem .5rem !important' }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs.map(({ match, breadcrumb }, i) => {
          if (i === last) {
            return (
              <Typography color="text.primary" key={match.pathname}>
                {breadcrumb}
              </Typography>
            );
          }
          return (
            <LinkRouter
              underline="hover"
              color="inherit"
              to={match.pathname}
              key={match.pathname}
            >
              {breadcrumb}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
}

export default BreadCrumbs;
