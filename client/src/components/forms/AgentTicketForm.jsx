import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PopMenuButton from '../ui/PopMenuButton';
import UserSelectionList from '../ui/UserSelectionList';
import getAllUsers from '../../graphql/queries/getAllUser';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import GroupSelection from '../ui/GroupSelection';
import Spinner from '../ui/LoadingSpinner';

function AgentTicketForm({ formTitle, handleSubmitCb, createForm }) {
  const { data: usersData, loading: usersLoading } = useQuery(getAllUsers);
  const [groupAssign, setGroupAssign] = useState({
    group: null,
    assignee: null,
  });
  const [requester, setRequester] = useState();
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    comment: '',
    privateComment: false,
    priority: 'Normal',
  });
  const handleGroupAssignee = (groupAssignChange) => {
    setGroupAssign((prev) => ({ ...prev, ...groupAssignChange }));
  };

  const handleOnChange = (e) => {
    if (e.target.name === 'privateComment') {
      setTicket((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
      return;
    }
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePriorityChange = (priority) => {
    setTicket((prev) => ({ ...prev, priority: priority.name }));
  };

  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const handleCommentChange = (val) => {
    setTicket((prev) => ({ ...prev, comment: val }));
  };
  const handleSubmit = (status) => {
    const addComment = {
      author: currentUser.id,
      content: ticket.comment,
      private: ticket.privateComment,
    };

    const ticketSubmit = {
      assignee: groupAssign?.assignee,
      group: groupAssign?.group,
      requester: requester?.id,
      comment: addComment.content ? addComment : null,
      status,
      priority: ticket.priority,
      title: ticket.title === '' ? undefined : ticket.title,
      description: ticket.description === '' ? undefined : ticket.description,
    };

    handleSubmitCb(ticketSubmit);
    setGroupAssign({
      group: null,
      assignee: null,
    });
    setTicket({
      title: '',
      description: '',
      comment: '',
      privateComment: false,
      priority: '',
    });
  };

  const priorities = ['Low', 'Normal', 'High', 'Urgent'].map((n) => ({
    id: n,
    name: n,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '60vh',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="subtitle1" component="h2">
            {formTitle}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {usersLoading ? (
            <Spinner />
          ) : (
            <>
              <UserSelectionList
                selectionList={usersData}
                defaultValue=""
                label="Requester"
                cb={setRequester}
                sxStyles={{ mb: '1rem', width: '100%', mt: 1 }}
                required={createForm}
              />

              <GroupSelection
                cb={handleGroupAssignee}
                sxStyles={{ mb: '1rem', width: '100%' }}
              />
            </>
          )}
          <UserSelectionList
            selectionList={priorities}
            label="Priority"
            defaultValue="Normal"
            valueBy="name"
            sxStyles={{ width: '100%' }}
            cb={handlePriorityChange}
          />
        </Box>

        <Box sx={{ width: '100%', padding: '0' }}>
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
        </Box>
        <Box sx={{ width: '100%', padding: '0' }}>
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
        </Box>
        <Box sx={{ width: '100%', padding: '0' }}>
          <FormControlLabel
            control={
              <Switch
                name="privateComment"
                checked={ticket.privateComment}
                onChange={handleOnChange}
              />
            }
            label="Private"
          />

          <div data-color-mode="light">
            <MDEditor
              value={ticket.comment}
              onChange={handleCommentChange}
              preview="edit"
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </div>
        </Box>
        <Box
          sx={{
            maxWidth: '150px',
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'right',
          }}
        >
          <PopMenuButton handleSubmit={handleSubmit} />
        </Box>
      </Box>
    </Box>
  );
}
export default AgentTicketForm;
