import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import getTicket from '../graphql/queries/getTicket';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import SelectionList from '../components/ui/SelectionList';
import getAllUsers from '../graphql/queries/getAllUser';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Comment from '../components/Comment';
import Container from '@mui/material/Container';
import ScrollDrawer from '../components/ui/ScrollDrawer';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import convert2FullDateTime from '../utils/convert2FullDateTime';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import PopMenuButton from '../components/ui/PopMenuButton';

function Ticket() {
  const [ticket, setTicket] = useState();
  const { id } = useParams();
  const { loading, error, data } = useQuery(getTicket, {
    variables: { ticketId: id },
    onCompleted: (data) => {
      setTicket(data.ticket);
    },
  });

  // #TODO Loading component
  const usersQuery = useQuery(getAllUsers);
  console.log(ticket);

  const handleSubmit = (status) => {
    console.log(status, 'ticket');
  };

  if (loading) return 'loading';
  return loading && !ticket ? (
    'loading'
  ) : (
    <>
      <Grid container sx={{ paddingBottom: '5rem' }}>
        <Grid item xs={12} md={5} lg={4}>
          <FormControl fullWidth>
            <SelectionList
              selectionList={usersQuery}
              defaultValue={ticket?.requester?.email}
              label="Requester"
            />
          </FormControl>
          <SelectionList
            selectionList={usersQuery}
            defaultValue={ticket?.assignee?.email}
            label="Assignee"
          />
          <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <TextField
              id="created-date"
              label="Created At:"
              defaultValue={
                ticket?.updatedAt && convert2FullDateTime(ticket?.createdAt)
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <TextField
              id="updated-date"
              label="Updated At:"
              defaultValue={
                ticket?.updatedAt && convert2FullDateTime(ticket?.updatedAt)
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Container sx={{ marginBottom: '.5rem' }}>
            <Card sx={{ display: 'flex', paddingBottom: '1rem' }}>
              <CardHeader
                title="Ticket Title:"
                sx={{ mb: 0, pb: 0, width: '25%' }}
              />
              <CardContent sx={{ paddingBottom: '0 !important', width: '75%' }}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="standard-helperText"
                    defaultValue={ticket?.title}
                    variant="standard"
                    size={'2rem'}
                  />
                </FormControl>
              </CardContent>
            </Card>
          </Container>

          <Container>
            <Card>
              <CardHeader title="Description:" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {ticket?.description}
                </Typography>
              </CardContent>
            </Card>
          </Container>

          <ScrollDrawer>
            <Card>
              <CardHeader title="Comments:" />
              <CardContent sx={{ maxHeight: '30vh', overflow: 'scroll' }}>
                {ticket?.comments.map((comment) => (
                  <Container
                    sx={{ mb: '.8rem', p: '0rem !important' }}
                    key={comment.id}
                  >
                    <Comment comment={comment} />
                  </Container>
                ))}
              </CardContent>
            </Card>
          </ScrollDrawer>
        </Grid>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 240,
            right: 0,
            minHeight: '8vh',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
          }}
          elevation={10}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'right',
              paddingLeft: 240,
              maxHeight: '50px',
            }}
          >
            <PopMenuButton
              handleSubmit={handleSubmit}
              defaultSelection={ticket.status}
            />
          </Container>
        </Paper>
      </Grid>
    </>
  );
}
export default Ticket;
