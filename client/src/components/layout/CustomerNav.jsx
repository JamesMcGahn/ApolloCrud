import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { green, blue } from '@mui/material/colors';
import { useQuery, useMutation } from '@apollo/client';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import signOutQ from '../../graphql/mutations/signOut';
import client from '../../graphql/apollo';
import PopModal from '../ui/PopModal';
import CreateTicketForm from '../forms/CreateTicketForm';
import LinkRouter from '../utils/LinkRouter';

const pages = ['Products', 'Pricing', 'Blog'];

function CustomerNav() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { data, loading: cULoading } = useQuery(loggedInUserQ);
  const [signOut] = useMutation(signOutQ, {
    onCompleted: async () => {
      await client.cache.reset();
      navigate('/login');
    },
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    handleCloseUserMenu();
    signOut();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {!cULoading && !data?.currentUser && (
            <>
              <Box
                sx={{
                  flexGrow: 0,
                  '& a': {
                    color: 'white',
                    textDecoration: 'none',
                  },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <LinkRouter to="/register" underline="none">
                    <Typography textAlign="center">REGISTER</Typography>
                  </LinkRouter>
                </MenuItem>
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  '& a': {
                    color: 'white',
                    textDecoration: 'none',
                  },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <LinkRouter to="/login" underline="none">
                    <Typography textAlign="center">LOGIN</Typography>
                  </LinkRouter>
                </MenuItem>
              </Box>
            </>
          )}

          {!cULoading && data?.currentUser && (
            <>
              <Box sx={{ flexGrow: 0, padding: '0 1.5rem' }}>
                <PopModal
                  buttonText="New Ticket"
                  open={modalOpen}
                  setOpen={setModalOpen}
                  buttonSx={{ color: 'white', borderColor: 'white' }}
                >
                  <CreateTicketForm closeModal={setModalOpen} />
                </PopModal>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor:
                          data?.currentUser?.role === 'user'
                            ? green[500]
                            : blue[500],
                      }}
                      aria-label="recipe"
                    >
                      {`${data?.currentUser?.name || 'A'}`[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <LinkRouter
                    underline="none"
                    to={`/${
                      data?.currentUser.role === 'user' ? 'customer' : 'agent'
                    }/profile`}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </LinkRouter>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <LinkRouter
                      underline="none"
                      to={`/${
                        data?.currentUser.role === 'user' ? 'customer' : 'agent'
                      }/dashboard`}
                    >
                      <Typography textAlign="center">Dashboard</Typography>
                    </LinkRouter>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomerNav;
