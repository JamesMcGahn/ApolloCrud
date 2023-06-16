import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SelectionList from '../ui/SelectionList';
import getAllUsers from '../../graphql/queries/getAllUser';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import PopMenuButton from '../ui/PopMenuButton';
import { toast } from 'react-toastify';
import updateBulkTicket from '../../graphql/mutations/updateTickets';

function BulkTicketEdit({ ids, closeModal }) {
  const [title, setTitle] = useState();
  const usersQuery = useQuery(getAllUsers);
  const [assignee, setAssignee] = useState();
  const [requester, setRequester] = useState();
  const [newComment, setNewComment] = useState();
  const [user, setUser] = useState();

  useQuery(loggedInUserQ, {
    onCompleted: (data) => {
      setUser(data.currentUser);
    },
  });

  const [updateTickets, { data: otherData }] = useMutation(updateBulkTicket, {
    onCompleted: (data) => {
      toast.success('Ticket Updated', {
        theme: 'colored',
      });
      closeModal(false);
    },
    onError(err) {
      console.log(err);
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (status) => {
    const addComment = {
      author: user.id,
      content: newComment,
    };

    const updatedTicket = {
      assignee: assignee?.id,
      requester: requester?.id,
      comment: addComment.content ? addComment : null,
      status,
      title: title,
    };

    updateTickets({
      variables: { updateTickets: updatedTicket, ids: ids },
    });

    setNewComment('');
    setTitle('');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '60vh',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
        }}
        autoComplete="off"
      >
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="subtitle1" component="h2">
            Bulk Edit
          </Typography>
        </Container>
        <Container sx={{ width: '100%' }}>
          <SelectionList
            selectionList={usersQuery}
            defaultValue=""
            label="Requester"
            cb={setRequester}
          />

          <SelectionList
            selectionList={usersQuery}
            defaultValue=""
            label="Assignee"
            cb={setAssignee}
          />
        </Container>
        <Container sx={{ width: '100%', padding: '0' }}>
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            sx={{ padding: '0', minWidth: '300px' }}
          />
        </Container>
        <Container sx={{ width: '100%', padding: '0' }}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Comment"
            variant="outlined"
            multiline
            rows={4}
            placeHolder="Write a Comment"
            onChange={handleCommentChange}
            value={newComment}
            sx={{ padding: '0', minWidth: '300px' }}
          />
        </Container>
        <Container sx={{ maxWidth: '150px', marginTop: '1rem' }}>
          <PopMenuButton handleSubmit={handleSubmit} />
        </Container>
      </Box>
    </Container>
  );
}
export default BulkTicketEdit;
