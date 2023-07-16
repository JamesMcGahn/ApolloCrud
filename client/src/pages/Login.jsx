import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import CustomerLayout from '../components/layout/CustomerLayout';
import loginAUser from '../graphql/mutations/loginAUser';

function Login() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({ password: '', email: '' });

  const [loggedIn] = useMutation(loginAUser, {
    variables: { loginUser },
    onCompleted: () => {
      navigate('/agent/dashboard');
    },
    onError(err) {
      console.log(err);
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const onChangeHandler = (e) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (loginUser.email && loginUser.password) {
      loggedIn(loginUser);
    } else {
      toast.error(
        `Fill in your ${
          // trunk-ignore(eslint/no-nested-ternary)
          !loginUser.email && !loginUser.password
            ? 'email and password.'
            : !loginUser.email
            ? 'email'
            : 'password'
        }`,
        {
          theme: 'colored',
        },
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    handleSubmit();
  };

  return (
    <CustomerLayout>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '90vh',
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
              Log In to Get Started.
            </Typography>
          </Container>
          <div>
            <TextField
              required
              type="text"
              id="email"
              label="Email"
              name="email"
              value={loginUser.email}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              id="password"
              label="Password"
              name="password"
              value={loginUser.password}
              onChange={onChangeHandler}
              onKeyUp={handleKeyPress}
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Container>
    </CustomerLayout>
  );
}
export default Login;
