import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import registerAUser from '../graphql/mutations/registerAUser';
import CustomerLayout from '../components/layout/CustomerLayout';

function Register() {
  const navigate = useNavigate();

  const [registerUser, setRegisterUser] = useState({
    password: '',
    email: '',
    name: '',
    passwordConfirm: '',
  });

  const [registered] = useMutation(registerAUser, {
    variables: { createUser: registerUser, agentCreated: false },
    onCompleted: () => {
      navigate('/agent/dashboard');
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const onChangeHandler = (e) => {
    setRegisterUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerUser.email && registerUser.password) {
      registered(registerUser);
    } else {
      toast.error(
        `Fill in your ${
          // trunk-ignore(eslint/no-nested-ternary)
          !registerUser.email && !registerUser.password
            ? 'email and password.'
            : !registerUser.email
            ? 'email'
            : 'password'
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
              Lets to Get Started.
            </Typography>
          </Container>
          <div>
            <TextField
              required
              type="text"
              id="name"
              label="Name"
              name="name"
              value={registerUser.name}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <TextField
              required
              type="text"
              id="email"
              label="Email"
              name="email"
              value={registerUser.email}
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
              value={registerUser.password}
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
              value={registerUser.passwordConfirm}
              onChange={onChangeHandler}
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Register
          </Button>
        </Box>
      </Container>
    </CustomerLayout>
  );
}
export default Register;
