import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import updateATicket from '../../graphql/mutations/updateTicket';
import Spinner from '../ui/LoadingSpinner';
import PopMenuButton from '../ui/PopMenuButton';
import SelectionList from '../ui/SelectionList';
import getAllUsers from '../../graphql/queries/getAllUser';
import Comment from '../Comment';
import ScrollDrawer from '../ui/ScrollDrawer';
import convert2FullDateTime from '../../utils/convert2FullDateTime';

function TicketPageForm({ data }) {
  const [ticket, setTicket] = useState(data.ticket);
  const [assignee, setAssignee] = useState();
  const [title, setTitle] = useState(data?.ticket.title);
  const [requester, setRequester] = useState();
  const [newComment, setNewComment] = useState();
  const [privateChecked, setPrivateChecked] = useState(false);
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const [updateTicket] = useMutation(updateATicket, {
    onCompleted: (datas) => {
      setTicket(datas.updateTicket);
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

  const { data: userData, loading: usersLoading } = useQuery(getAllUsers);

  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handlePrivateChecked = (e) => setPrivateChecked(e.target.checked);
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (status) => {
    const addComment = {
      author: currentUser.id,
      content: newComment,
      private: privateChecked,
    };

    const updatedTicket = {
      assignee: assignee?.id,
      requester: requester?.id,
      comment: addComment.content ? addComment : null,
      description: ticket.description,
      status,
      title,
    };

    updateTicket({
      variables: { updateTicket: updatedTicket, updateTicketId: ticket.id },
    });

    setNewComment('');
  };

  return (
    <Grid container sx={{ paddingBottom: '5rem' }}>
      <Grid item xs={12} md={5} lg={4}>
        {usersLoading ? (
          <Spinner />
        ) : (
          <FormControl fullWidth>
            <SelectionList
              selectionList={userData}
              defaultValue={ticket?.requester?.email}
              label="Requester"
              cb={setRequester}
            />

            <SelectionList
              selectionList={userData}
              defaultValue={ticket?.assignee?.email}
              label="Assignee"
              cb={setAssignee}
            />
          </FormControl>
        )}

        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            id="created-date"
            label="Created At:"
            value={ticket?.updatedAt && convert2FullDateTime(ticket?.createdAt)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <TextField
            id="updated-date"
            label="Updated At:"
            value={ticket?.updatedAt && convert2FullDateTime(ticket?.updatedAt)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ScrollDrawer>
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
                    value={title}
                    variant="standard"
                    size="2rem"
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
                <FormControlLabel
                  control={
                    <Switch
                      checked={privateChecked}
                      onChange={handlePrivateChecked}
                    />
                  }
                  label="Private"
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  onChange={handleCommentChange}
                  value={newComment}
                />
              </CardContent>
            </Card>
          </Container>

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
          left: 0,
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
  );
}
export default TicketPageForm;
