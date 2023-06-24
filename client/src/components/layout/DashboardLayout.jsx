import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { green, blue } from '@mui/material/colors';
import { useQuery, useMutation } from '@apollo/client';
import CreateTicketForm from '../forms/CreateTicketForm';
import PopModal from '../ui/PopModal';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import signOutQ from '../../graphql/mutations/signOut';
import client from '../../graphql/apollo';
import LinkRouter from '../utils/LinkRouter';
import { ReactComponent as ApolloLogo } from '../../assets/svgs/ApolloTicketsNameNLogo.svg';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DashboardLayout({ children, list, dwrDefOpen }) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(dwrDefOpen);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { data, loading: cULoading } = useQuery(loggedInUserQ);
  const [searchWords, setSearchWords] = React.useState('');

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const [signOut] = useMutation(signOutQ, {
    onCompleted: async () => {
      await client.cache.reset();
      navigate('/login');
    },
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    handleCloseUserMenu();
    signOut();
  };

  const handleOnChange = (e) => {
    setSearchWords(e.target.value);
  };

  const handleKeyUp = (e) => {
    const baseUrl = '/agent/dashboard/ticket?';

    if (e.key === 'Enter') {
      if (/^\d+$/.test(e.target.value)) {
        navigate(`${baseUrl}ticket=${e.target.value}`);
        return;
      }
      const searchTarg = e.target.value.split(' ');
      const search = searchTarg
        .map((x) => x.split(':').map((y) => y.trim()))
        .reduce((a, x) => {
          a[x[0]] = x[1];
          return a;
        }, {});

      const searchString = new URLSearchParams(search).toString();
      setSearchWords('');
      navigate(`${baseUrl}${searchString}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
            }}
          >
            <Box sx={{ width: '45%', display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  minHeight: '3vh',
                  maxWidth: { sm: '20vw', md: '15vw' },
                }}
              >
                <ApolloLogo style={{ minHeight: '3vh' }} />
              </Box>
            </Box>
            <Box sx={{ minWidth: '20vw' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onKeyUp={handleKeyUp}
                  value={searchWords}
                  onChange={handleOnChange}
                />
              </Search>
            </Box>
          </Box>
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

          {!cULoading && data?.currentUser && (
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
                      data?.currentUser === 'user' ? 'customer' : 'agent'
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
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {list}
      </Drawer>
      <Main open={open} sx={{ padding: '24px 0' }}>
        <DrawerHeader sx={{ minHeight: '40px !important' }} />
        {children}
      </Main>
    </Box>
  );
}
