import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import updateATicket from '../../graphql/mutations/updateTicket';
import Spinner from '../ui/LoadingSpinner';
import PopMenuButton from '../ui/PopMenuButton';
import UserSelectionList from '../ui/UserSelectionList';
import GroupSelection from '../ui/GroupSelection';
import getAllUsers from '../../graphql/queries/getAllUser';
import Comment from '../cards/Comment';
import ScrollDrawer from '../ui/ScrollDrawer';
import convert2FullDateTime from '../../utils/convert2FullDateTime';
import MergeTickets from './MergeTickets';
import PopModal from '../ui/PopModal';
import TabPanel from '../navs/TabPanel';

function TicketPageForm({ data, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mOpen, setMOpen] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [ticket, setTicket] = useState(data?.ticket);
  const [groupAssign, setGroupAssign] = useState({
    group: null,
    assignee: null,
  });
  const [tixPriority, setTixPriority] = useState();
  const [title, setTitle] = useState(data?.ticket.title);
  const [requester, setRequester] = useState();
  const [newComment, setNewComment] = useState();
  const [privateChecked, setPrivateChecked] = useState(false);
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const ticketClosed = ticket?.status === 'Closed';

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
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelClick = () => {
    setAnchorEl(null);
    if (handleDelete) {
      handleDelete(ticket?.id);
    }
  };

  const handleMergeClick = () => {
    setAnchorEl(null);
    setMOpen(true);
  };

  const { data: userData, loading: usersLoading } = useQuery(getAllUsers);
  const handlePriorityChange = (priority) => {
    setTixPriority(priority.name);
  };

  const handlePrivateChecked = (e) => setPrivateChecked(e.target.checked);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleGroupAssignee = (groupAssignChange) => {
    setGroupAssign((prev) => ({ ...prev, ...groupAssignChange }));
  };

  const handleSubmit = (status) => {
    const addComment = {
      author: currentUser.id,
      content: newComment,
      private: privateChecked,
    };

    const updatedTicket = {
      assignee: groupAssign?.assignee,
      group: groupAssign?.group,
      requester: requester?.id,
      comment: addComment.content ? addComment : null,
      description: ticket.description,
      status,
      title,
      priority: tixPriority,
    };

    updateTicket({
      variables: { updateTicket: updatedTicket, updateTicketId: ticket.id },
    });

    setNewComment('');
  };

  const priorities = ['Low', 'Normal', 'High', 'Urgent'].map((n) => ({
    id: n,
    name: n,
  }));

  return (
    <>
      <PopModal noButton open={mOpen} setOpen={setMOpen}>
        <MergeTickets ticket={ticket?.id} closeModal={setMOpen} />
      </PopModal>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          paddingRight: '4rem',
        }}
      >
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleDelClick}>Delete</MenuItem>
          {!ticketClosed && (
            <MenuItem onClick={handleMergeClick}>Merge</MenuItem>
          )}
        </Menu>
      </Box>
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
                sxStyles={{ mb: '1rem', width: '100%', mt: 1 }}
                disabled={ticketClosed}
              />

              <GroupSelection
                groupDefaultVal={ticket?.group}
                assigneeDefaultVal={ticket?.assignee}
                cb={handleGroupAssignee}
                sxStyles={{ mb: '1rem', width: '100%' }}
                disabled={ticketClosed}
              />

              <UserSelectionList
                selectionList={priorities}
                label="Priority"
                defaultValue={ticket?.priority}
                valueBy="name"
                sxStyles={{ mb: '1rem', width: '100%' }}
                cb={handlePriorityChange}
                disabled={ticketClosed}
              />
            </FormControl>
          )}

          <FormControl sx={{ mb: '1rem', width: '100%' }}>
            <TextField
              id="updated-date"
              label="Updated At:"
              value={
                ticket?.updatedAt && convert2FullDateTime(ticket?.updatedAt)
              }
              disabled={ticketClosed}
            />
          </FormControl>
          <FormControl sx={{ mb: '1rem', width: '100%' }}>
            <TextField
              id="created-date"
              label="Created At:"
              value={
                ticket?.updatedAt && convert2FullDateTime(ticket?.createdAt)
              }
              disabled={ticketClosed}
            />
          </FormControl>
          <FormControl sx={{ mb: '1rem', width: '100%' }}>
            <TextField
              id="channel"
              label="channel"
              defaultValue={ticket?.channel}
              value={ticket?.channel}
              disabled
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
                sx={{
                  display: 'flex',
                  padding: '1rem',
                  flexWrap: 'wrap',
                  mb: 1,
                }}
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
                      disabled={ticketClosed}
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

              <TabPanel
                sxStyles={{
                  '& .MuiPaper-root': { borderRadius: '.2rem' },
                  '& .MuiTabs-indicator': {
                    borderRadius: '.2rem',
                  },
                }}
                breadCrumbs={false}
                tabHeaders={['Comments', 'History']}
                tabContent={[
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
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={privateChecked}
                            onChange={handlePrivateChecked}
                            disabled={ticketClosed}
                          />
                        }
                        label="Private"
                      />

                      <div data-color-mode="light">
                        <MDEditor
                          value={newComment}
                          onChange={setNewComment}
                          preview="edit"
                          previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                          }}
                        />
                      </div>
                    </Box>
                    <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
                      {ticket?.comments.toReversed().map((comment) => (
                        <Box
                          sx={{ mb: '.8rem', p: '0 .5rem' }}
                          key={comment.id}
                        >
                          <Comment comment={comment} />
                        </Box>
                      ))}
                    </Box>
                  </Card>,
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem',
                      flexWrap: 'wrap',
                      mb: 1,
                    }}
                  >
                    {ticket?.history &&
                      [...ticket.history].reverse().map((his, i) => (
                        <Box
                          sx={{ mb: '.8rem', p: '0 .5rem' }}
                          // trunk-ignore(eslint/react/no-array-index-key)
                          key={`${i}-ticket-history`}
                        >
                          <Card>
                            <CardContent>
                              <Typography variant="h6">
                                {`Ticket was ${his.type}d by ${his.updaterName} (${his.updaterId})  `}
                              </Typography>
                              <Typography>
                                <strong>
                                  {`${his.type[0].toUpperCase()}${his.type.slice(
                                    1,
                                  )}d At:`}
                                </strong>
                                {` ${convert2FullDateTime(his.updatedAt)}`}
                              </Typography>
                              <Box
                                sx={{
                                  padding: '1rem 0',
                                  width: '100%',
                                  borderTop: '1px solid black',
                                }}
                              >
                                {[
                                  'group',
                                  'assignee',
                                  'requester',
                                  'title',
                                  'description',
                                  'status',
                                  'priority',
                                  'comment',
                                ].map((fld) => {
                                  if (!his[fld]) {
                                    return;
                                  }
                                  if (
                                    fld === 'comment' &&
                                    !his.comment.content
                                  ) {
                                    return;
                                  }

                                  if (fld === 'comment') {
                                    return (
                                      <>
                                        <Typography>
                                          <strong>Comment:</strong>
                                        </Typography>
                                        <Box sx={{ paddingLeft: '1rem' }}>
                                          <Typography>{` Comment ID: ${his.comment.id}`}</Typography>
                                          <Typography>{` Comment Content: ${his.comment.content}`}</Typography>
                                          <Typography>{` Private: ${his.comment.private}`}</Typography>
                                        </Box>
                                      </>
                                    );
                                  }

                                  return (
                                    <Typography>
                                      <strong>
                                        {`${fld[0].toUpperCase()}${fld.slice(
                                          1,
                                        )}:`}
                                      </strong>
                                      {` ${his[fld]}`}
                                    </Typography>
                                  );
                                })}
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      ))}
                  </Card>,
                ]}
              />
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
            zIndex: 1000,
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
    </>
  );
}
export default TicketPageForm;
