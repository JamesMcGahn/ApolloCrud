import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import updateATicket from '../../graphql/mutations/updateTicket';
import Spinner from '../ui/LoadingSpinner';
import PopMenuButton from '../ui/PopMenuButton';
import UserSelectionList from '../ui/UserSelectionList';
import getAllUsers from '../../graphql/queries/getAllUser';
import Comment from '../cards/Comment';
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
    <Container sx={{ paddingBottom: '5rem', display: 'flex' }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '325px !important',
          paddingLeft: '0px !important',
        }}
      >
        {usersLoading ? (
          <Spinner />
        ) : (
          <FormControl>
            <UserSelectionList
              selectionList={userData}
              defaultValue={ticket?.requester?.email}
              label="Requester"
              cb={setRequester}
            />

            <UserSelectionList
              selectionList={userData}
              defaultValue={ticket?.assignee?.email}
              label="Assignee"
              cb={setAssignee}
              assignee
            />
          </FormControl>
        )}

        <FormControl sx={{ m: 1, width: '300px', mt: 3 }}>
          <TextField
            id="created-date"
            label="Created At:"
            value={ticket?.updatedAt && convert2FullDateTime(ticket?.createdAt)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '300px', mt: 3 }}>
          <TextField
            id="updated-date"
            label="Updated At:"
            value={ticket?.updatedAt && convert2FullDateTime(ticket?.updatedAt)}
          />
        </FormControl>
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px !important',
        }}
      >
        <ScrollDrawer>
          <Container sx={{ marginBottom: '.5rem' }}>
            <Card
              sx={{ display: 'flex', padding: '1rem', flexWrap: 'wrap', mb: 1 }}
            >
              <Box
                sx={{
                  padding: '.2rem 0 0 0',
                  maxWidth: '2rem',
                  mr: '10px',
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
                  Title:
                </Typography>
              </Box>
              <Box sx={{ padding: '0 0 0 1rem', width: '75%' }}>
                <FormControl fullWidth>
                  <TextField
                    sx={{ '& input': { fontSize: '1.5rem' } }}
                    fullWidth
                    id="standard-helperText"
                    value={title}
                    variant="standard"
                    size="2rem"
                    onChange={handleTitleChange}
                  />
                </FormControl>
              </Box>
            </Card>
          </Container>

          <Container>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                flexWrap: 'wrap',
                mb: 1,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                  Description:
                </Typography>
              </Box>
              <Box sx={{ pt: '.5rem' }}>
                <Typography variant="body2" color="text.secondary">
                  {ticket?.description}
                </Typography>
              </Box>
            </Card>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                flexWrap: 'wrap',
                mb: 1,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                  Comments:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
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
                  sx={{
                    mt: 1,
                    '& textarea': {
                      background: privateChecked ? 'yellow' : 'white',
                    },
                  }}
                  id="newComment"
                  label={privateChecked ? 'Private Note' : 'New Comment'}
                  placeholder={
                    privateChecked
                      ? 'Enter a Private Note'
                      : 'Enter a New Comment.'
                  }
                  multiline
                  rows={4}
                  onChange={handleCommentChange}
                  value={newComment}
                />
              </Box>
              <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
                {ticket?.comments.toReversed().map((comment) => (
                  <Box sx={{ mb: '.8rem', p: '0 .5rem' }} key={comment.id}>
                    <Comment comment={comment} />
                  </Box>
                ))}
              </Box>
            </Card>
          </Container>
        </ScrollDrawer>
      </Container>
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
    </Container>
  );
}
export default TicketPageForm;
