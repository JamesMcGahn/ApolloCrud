import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AgentLayout from '../components/layout/AgentLayout';
import LinkRouter from '../components/utils/LinkRouter';

const cardSx = {
  minWidth: {
    sm: '100%',
    md: '49%',
  },
  marginRight: '1%',
  mt: 3,
};

function AgentHome() {
  return (
    <AgentLayout>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ minWidth: '60vw', minHeight: '40vh', mt: 3 }}>
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
            <Card sx={cardSx}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div">
                  Tickets
                </Typography>
                <LinkRouter to="/agent/dashboard">Tickets</LinkRouter>
              </CardContent>
            </Card>
            <Card sx={cardSx}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div">
                  Users & Companies
                </Typography>
                <LinkRouter to="/agent/dashboard/users">Users</LinkRouter>
                <LinkRouter to="/agent/dashboard/companies">
                  Companies
                </LinkRouter>
              </CardContent>
            </Card>
            <Card sx={cardSx}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div">
                  Knowledge Base
                </Typography>
              </CardContent>
            </Card>
            <Card sx={cardSx}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div">
                  My Info
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Container>
    </AgentLayout>
  );
}
export default AgentHome;
