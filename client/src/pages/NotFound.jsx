import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CustomerLayout from '../components/layout/CustomerLayout';
import AgentLayout from '../components/layout/AgentLayout';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import LinkRouter from '../components/utils/LinkRouter';

function NotFound() {
  const location = useLocation();
  const { data: custData } = useQuery(loggedInUserQ);

  const content = (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        alignItems: 'center',
      }}
    >
      <Card>
        <CardHeader
          title={
            location?.state?.title
              ? location?.state?.title
              : 'We Cannot Find that Page'
          }
        />
        <CardContent>
          <Typography>
            {location?.state?.message
              ? location?.state?.message
              : 'We Cannot Find that Page. Please check that you have the right link.'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              mt: 2,
            }}
          >
            <LinkRouter to="/">
              <Button variant="contained">Home</Button>
            </LinkRouter>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
  return (
    // trunk-ignore(eslint/react/jsx-no-useless-fragment)
    <>
      {custData?.currentUser.role !== 'user' ? (
        <AgentLayout>{content}</AgentLayout>
      ) : (
        <CustomerLayout>{content}</CustomerLayout>
      )}
    </>
  );
}
export default NotFound;
