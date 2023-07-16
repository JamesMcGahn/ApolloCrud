import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import forgotMyPassword from '../../graphql/mutations/forgotMyPassword';
import Spinner from '../../components/ui/LoadingSpinner';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const [forgotPass, { data, loading }] = useMutation(forgotMyPassword, {
    onCompleted: () => {
      setEmail('');
      toast.success('Check your email.', {
        theme: 'colored',
      });
    },
    onError: (err) => {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      toast.error('Enter an email', {
        theme: 'colored',
      });
    }

    forgotPass({ variables: { email: email } });
  };
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '60vh',
        alignItems: 'center',
      }}
    >
      <Card>
        <CardContent
          component="form"
          sx={{
            '& .MuiTextField-root': { mb: 1, mt: 1, width: '100%' },
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 2rem',
          }}
          autoComplete="off"
        >
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '30vh',
                minHeight: '20vh',
              }}
            >
              <Spinner />
            </Box>
          )}
          {!loading && data?.forgotPassword === true && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '2rem',
                }}
              >
                <Typography variant="h6" component="h2">
                  We sent you an email...
                </Typography>
                <Typography variant="subtitle1">
                  Check your email on how to reset your password
                </Typography>
              </Box>
            </Box>
          )}
          {!loading && !data && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: 0,
                }}
              >
                <Typography variant="h6" component="h2">
                  Forgot your password...?
                </Typography>
                <Typography variant="subtitle1">
                  We will send you an email to reset your password.
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  '& input': {
                    width: '100%',
                  },
                }}
              >
                <TextField
                  required
                  type="text"
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                />
              </Box>
              <Button variant="contained" onClick={handleSubmit}>
                Reset Password
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
export default ForgotPassword;
