import { useState } from 'react';
import Container from '@mui/material/Container';
import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PopMenuButton from '../ui/PopMenuButton';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import UserSelectionList from '../ui/UserSelectionList';

function AgentTicketForm({ formTitle, handleSubmitCb, createForm }) {
  const [assignee, setAssignee] = useState();
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    comment: '',
    privateComment: false,
    priority: '',
  });

  const handleOnChange = (e) => {
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePriorityChange = (priority) => {
    setTicket((prev) => ({ ...prev, priority: priority.name }));
  };

  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const handleSubmit = (status = 'New') => {
    const addComment = {
      author: currentUser.id,
      content: ticket.comment,
      private: false,
    };

    const ticketSubmit = {
      assignee: assignee?.id,
      requester: currentUser.id,
      comment: addComment.content ? addComment : null,
      status,
      priority: ticket.priority === '' ? undefined : ticket.priority,
      title: ticket.title === '' ? undefined : ticket.title,
      description: ticket.description === '' ? undefined : ticket.description,
    };

    handleSubmitCb(ticketSubmit);
    setAssignee('');
    setTicket({
      title: '',
      description: '',
      comment: '',
      privateComment: false,
    });
  };

  const priorities = ['Low', 'Normal', 'High', 'Urgent'].map((n) => ({
    id: n,
    name: n,
  }));

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
        {createForm && (
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

            <UserSelectionList
              selectionList={priorities}
              label="Priority"
              defaultValue="Normal"
              valueBy="name"
              sxStyles={{ width: '310px', mb: '1rem', paddingLeft: '.5rem' }}
              cb={handlePriorityChange}
            />
          </Container>
        )}
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
        <Container
          sx={{
            maxWidth: '150px',
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'right',
          }}
        >
          {createForm ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit('New')}
            >
              Submit
            </Button>
          ) : (
            <PopMenuButton handleSubmit={handleSubmit} />
          )}
        </Container>
      </Box>
    </Container>
  );
}
export default AgentTicketForm;
