import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import CustomerLayout from '../../../components/layout/CustomerLayout';
import loggedInUserQ from '../../../graphql/queries/loggedInUser';
import getTicket from '../../../graphql/queries/getTicket';
import Spinner from '../../../components/ui/LoadingSpinner';
import getTicketReview from '../../../graphql/queries/getTicketReview';
import createUpdateTicketReview from '../../../graphql/mutations/createUpdateTicketReview';

function TicketReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState('');
  const [tixReview, setTixReview] = useState({
    assignee: null,
    requester: null,
    comment: null,
    rating: 3,
  });

  const { data: custData } = useQuery(loggedInUserQ);
  const { loading, data } = useQuery(getTicket, {
    variables: { ticketId: id },

    onError: (err) => {
      if (err.message === 'We cannot find that Ticket Id') {
        navigate('/404', {
          state: {
            title: 'We Cannot Find That Ticket.',
            message: `We cannot find the Ticket: ${id}. Please make sure you have the right ticket number.`,
          },
        });
      }
    },
  });

  const [cUTixReview] = useMutation(createUpdateTicketReview, {
    onCompleted: (cuData) => {
      if (cuData) {
        setTixReview(cuData.createTicketReview);
      }
      toast.success('Thank You For Your Review.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { data: ticketReview, loading: ticketReviewLoading } = useQuery(
    getTicketReview,
    {
      variables: { ticket: id },
      onCompleted: (reviewData) => {
        if (reviewData) {
          setTixReview(reviewData.ticketReview);
          setComment(reviewData.ticketReview?.comment);
        }
      },
      onError: (err) => {
        if (err.message === 'You dont have permission to view this Review') {
          toast.error(err.message);
          navigate('/customer');
        }
      },
    },
  );

  const handleOnChange = (e) => {
    setTixReview((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmit = () => {
    const subTixReview = {
      ticket: data.ticket.id,
      agent: data.ticket.assignee.id,
      reviewer: custData.currentUser.id,
      comment: tixReview.comment,
      rating: tixReview.rating,
    };
    console.log(subTixReview);
    cUTixReview({ variables: { newTicketReview: subTixReview } });
  };

  const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

  return (
    <CustomerLayout>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Card
          sx={{
            minWidth: '40vw',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '35vh',
          }}
        >
          {(loading || ticketReviewLoading) && <Spinner />}
          {(!loading || !ticketReviewLoading) && (
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" component="h1">
                {`Feedback For Ticket: ${id}`}
              </Typography>

              {ticketReview ? (
                <>
                  <Typography>Thank You for Rating Your Experience.</Typography>
                  <Typography>
                    {`If you would like to adjust your rating ${
                      !ticketReview.comment && 'or leave a comment'
                    }, please go ahead.`}
                  </Typography>
                </>
              ) : (
                <Typography>
                  Please Rate Your Experience. This helps us improve our service
                  to you.
                </Typography>
              )}

              <Box
                sx={{
                  width: 300,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  mt: 1,
                  mb: 1,
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={tixReview.rating}
                  precision={1}
                  size="large"
                  onChange={(event, newValue) => {
                    setTixReview((prev) => ({ ...prev, rating: newValue }));
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {tixReview.rating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : tixReview.rating]}
                  </Box>
                )}
              </Box>
              <Box sx={{ mt: 1, mb: 1 }}>
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
                  value={tixReview.comment || ''}
                  sx={{ padding: '0', minWidth: '20vw' }}
                />
              </Box>
              <Box>
                <Button variant="contained" onClick={handleSubmit}>
                  {ticketReview ? 'Update' : 'Submit'}
                </Button>
              </Box>
            </CardContent>
          )}
        </Card>
      </Container>
    </CustomerLayout>
  );
}
export default TicketReview;
