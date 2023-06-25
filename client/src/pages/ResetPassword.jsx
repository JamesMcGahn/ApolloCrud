import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomerLayout from '../components/layout/CustomerLayout';
import resetMyPassword from '../graphql/mutations/resetMyPassword';
import Spinner from '../components/ui/LoadingSpinner';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [resetPassword, setresetPassword] = useState({
    token: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    if (resetPassword.token === '') {
      setresetPassword((prev) => ({
        ...prev,
        token: searchParams.get('token'),
      }));
    }
  }, [searchParams]);

  const [registered, { loading }] = useMutation(resetMyPassword, {
    variables: { resetPassword: resetPassword },
    onCompleted: () => {
      navigate('/login');
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const onChangeHandler = (e) => {
    setresetPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      resetPassword.passwordConfirm &&
      resetPassword.password &&
      resetPassword.token
    ) {
      registered(resetPassword);
    }
    if (!resetPassword.token) {
      toast.error(
        'Password reset token is missing. Make sure you have the correct link',
        {
          theme: 'colored',
        },
      );
    }

    if (!resetPassword.passwordConfirm || !resetPassword.password) {
      toast.error(
        `Fill in your ${
          // trunk-ignore(eslint/no-nested-ternary)
          !resetPassword.password && !resetPassword.passwordConfirm
            ? 'password and password confirm.'
            : !resetPassword.password
            ? 'password.'
            : 'password confirm.'
        }`,
        {
          theme: 'colored',
        },
      );
    }
  };

  return (
    <CustomerLayout>
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
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              display: 'flex',
              flexDirection: 'column',
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
            {!loading && (
              <>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="subtitle1" component="h2">
                    Reset Your Password.
                  </Typography>
                </Container>

                <div>
                  <TextField
                    required
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    value={resetPassword.password}
                    onChange={onChangeHandler}
                  />
                </div>

                <div>
                  <TextField
                    required
                    type="password"
                    id="passwordConfirm"
                    label="Confirm Password"
                    name="passwordConfirm"
                    value={resetPassword.passwordConfirm}
                    onChange={onChangeHandler}
                  />
                </div>
                <Button variant="contained" onClick={handleSubmit}>
                  Reset
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </CustomerLayout>
  );
}
export default ResetPassword;
