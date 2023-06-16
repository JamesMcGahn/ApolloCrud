import { useState } from 'react';
import Container from '@mui/material/Container';
import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PopMenuButton from '../ui/PopMenuButton';
import SelectionList from '../ui/SelectionList';
import getAllUsers from '../../graphql/queries/getAllUser';
import loggedInUserQ from '../../graphql/queries/loggedInUser';

function TicketForm({ formTitle, handleSubmitCb, createForm }) {
  const { data: usersData, loading: usersLoading } = useQuery(getAllUsers);
  const [assignee, setAssignee] = useState();
  const [requester, setRequester] = useState();
  const [ticket, setTicket] = useState({
    title: undefined,
    description: undefined,
    comment: undefined,
  });

  const handleOnChange = (e) => {
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const handleSubmit = (status) => {
    const addComment = {
      author: currentUser.id,
      content: ticket.comment,
    };

    const ticketSubmit = {
      assignee: assignee?.id,
      requester: requester?.id,
      comment: addComment.content ? addComment : null,
      status,
      title: ticket.title,
      description: ticket.description,
    };

    handleSubmitCb(ticketSubmit);
    setAssignee('');
    setRequester('');
    setTicket({
      title: '',
      description: '',
      comment: '',
    });
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
            {formTitle}
          </Typography>
        </Container>
        <Container sx={{ width: '100%' }}>
          {!usersLoading && (
            <>
              <SelectionList
                selectionList={usersData}
                defaultValue=""
                label="Requester"
                cb={setRequester}
              />

              <SelectionList
                selectionList={usersData}
                defaultValue=""
                label="Assignee"
                cb={setAssignee}
              />
            </>
          )}
        </Container>

        <Container sx={{ width: '100%', padding: '0' }}>
          <TextField
            required={createForm}
            fullWidth
            variant="outlined"
            type="text"
            id="title"
            label="Title"
            name="title"
            value={ticket.title}
            onChange={handleOnChange}
            sx={{ padding: '0', minWidth: '300px' }}
          />
        </Container>
        <Container sx={{ width: '100%', padding: '0' }}>
          <TextField
            required={createForm}
            fullWidth
            variant="outlined"
            type="text"
            id="Description"
            label="Description"
            name="description"
            value={ticket.description}
            onChange={handleOnChange}
            sx={{ padding: '0', minWidth: '300px' }}
          />
        </Container>
        <Container sx={{ width: '100%', padding: '0' }}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Comment"
            name="comment"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Write a Comment"
            onChange={handleOnChange}
            value={ticket.comment}
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
export default TicketForm;
