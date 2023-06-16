import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
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
import Paper from '@mui/material/Paper';
import PopMenuButton from '../components/ui/PopMenuButton';
import { toast } from 'react-toastify';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import updateATicket from '../graphql/mutations/updateTicket';

function Ticket() {
  const [ticket, setTicket] = useState();
  const [assignee, setAssignee] = useState();
  const [requester, setRequester] = useState();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [newComment, setNewComment] = useState();
  useQuery(loggedInUserQ, {
    onCompleted: (data) => {
      setUser(data.currentUser);
    },
  });
  const { loading, error, data } = useQuery(getTicket, {
    variables: { ticketId: id },
    onCompleted: (data) => {
      setTicket(data.ticket);
      setAssignee(data.ticket?.assignee);
      setRequester(data.ticket?.requester);
    },
  });

  const [updateTicket, { data: otherData }] = useMutation(updateATicket, {
    onCompleted: (data) => {
      setTicket(data.updateTicket);
      toast.success('Ticket Updated', {
        theme: 'colored',
      });
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  // #TODO Loading component
  const usersQuery = useQuery(getAllUsers);

  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleTitleChange = (e) =>
    setTicket((prev) => ({ ...prev, title: e.target.value }));

  const handleSubmit = (status) => {
    const addComment = {
      author: user.id,
      content: newComment,
    };

    const updatedTicket = {
      assignee: assignee?.id,
      requester: requester?.id,
      comment: addComment.content ? addComment : null,
      description: ticket.description,
      status,
      title: ticket.title,
    };

    updateTicket({
      variables: { updateTicket: updatedTicket, updateTicketId: id },
    });

    setNewComment('');
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
              cb={setRequester}
            />
          </FormControl>
          <SelectionList
            selectionList={usersQuery}
            defaultValue={ticket?.assignee?.email}
            label="Assignee"
            cb={setAssignee}
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
                    value={ticket?.title}
                    variant="standard"
                    size={'2rem'}
                    onChange={handleTitleChange}
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
          <Container>
            <Card>
              <CardHeader title="New Comment:" />
              <CardContent>
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  onChange={handleCommentChange}
                  value={newComment}
                />
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
              defaultSelection={ticket?.status}
            />
          </Container>
        </Paper>
      </Grid>
    </>
  );
}
export default Ticket;
