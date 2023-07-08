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
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import updateATicket from '../../graphql/mutations/updateTicket';
import PopMenuButton from '../ui/PopMenuButton';
import Comment from '../cards/Comment';
import ScrollDrawer from '../ui/ScrollDrawer';
import convert2FullDateTime from '../../utils/convert2FullDateTime';
import LinkRouter from '../utils/LinkRouter';
import BreadCrumbs from '../navs/BreadCrumbs';

function CusTicketPageForm({ data }) {
  const [ticket, setTicket] = useState(data.ticket);
  const ticketClosed = ticket.status === 'Closed';
  const [newComment, setNewComment] = useState();
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);

  const [updateTicket] = useMutation(updateATicket, {
    onCompleted: (datas) => {
      setTicket(datas.updateTicket);
      toast.success('Ticket Updated', {
        theme: 'colored',
      });
      if (datas.updateTicket.status === 'Solved') {
        toast.info(
          <LinkRouter
            to={`/customer/dashboard/ticket/${datas.updateTicket.id}/feedback`}
          >
            Leave Feedback On Your Ticket!
          </LinkRouter>,
          {
            theme: 'colored',
          },
        );
      }
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleSubmit = (status) => {
    const addComment = {
      author: currentUser.id,
      content: newComment,
      private: false,
    };

    const updatedTicket = {
      comment: addComment.content ? addComment : null,
      description: ticket.description,
      status,
      title: ticket.title,
    };

    updateTicket({
      variables: { updateTicket: updatedTicket, updateTicketId: ticket.id },
    });

    setNewComment('');
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <BreadCrumbs />
      <Container sx={{ paddingBottom: '5rem', display: 'flex' }}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '325px !important',
            paddingLeft: '0px !important',
          }}
        >
          <FormControl sx={{ m: 1, width: '300px', mt: 3 }}>
            <TextField
              id="requester"
              label="Requester:"
              value={ticket?.requester?.email}
              disabled={ticketClosed}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '300px', mt: 3 }}>
            <TextField
              id="Assignee"
              label="Assignee:"
              value={ticket?.assignee?.email}
              disabled={ticketClosed}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '300px', mt: 3 }}>
            <TextField
              id="created-date"
              label="Created At:"
              value={
                ticket?.updatedAt && convert2FullDateTime(ticket?.createdAt)
              }
              disabled={ticketClosed}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '300px', mt: 3 }}>
            <TextField
              id="updated-date"
              label="Updated At:"
              value={
                ticket?.updatedAt && convert2FullDateTime(ticket?.updatedAt)
              }
              disabled={ticketClosed}
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
                <Box sx={{ padding: '.5rem 0 0 1rem', width: '75%' }}>
                  <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
                    {ticket?.title}
                  </Typography>
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
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    id="newComment"
                    label="New Comment"
                    placeholder="Enter a New Comment."
                    multiline
                    rows={4}
                    onChange={handleCommentChange}
                    value={newComment}
                    disabled={ticketClosed}
                  />
                </Box>
                <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  {ticket?.comments.toReversed().map((comment) => {
                    if (comment.private) return;

                    return (
                      <Box sx={{ mb: '.8rem', p: '0 .5rem' }} key={comment.id}>
                        <Comment comment={comment} />
                      </Box>
                    );
                  })}
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
    </Container>
  );
}
export default CusTicketPageForm;
