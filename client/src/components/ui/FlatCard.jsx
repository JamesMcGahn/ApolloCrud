import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinkRouter from '../utils/LinkRouter';

function FlatCard({ title, content, linkText, link }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        background: '#F9FCFD',
        color: 'black',
        padding: '1rem',
        '& button:hover': {
          backgroundColor: '#F9FCFD',
          boxShadow: 'none',
        },
        '& button::after': {
          content: "''",
          position: 'absolute',
          left: '0',
          bottom: '0',
          width: '100%',

          height: '2px',
          background: '#2C3E50',
          transition: 'all 0.45s',
        },
        '& button:hover::after': {
          width: '0px',
          left: '50%',
        },
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontSize: '1.5rem' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtext" sx={{ fontSize: '.83 rem' }}>
          {content}
        </Typography>
      </Box>
      <Box>
        <LinkRouter to={link}>
          <Button
            disableRipple
            variant="contained"
            sx={{
              borderRadius: 0,
              backgroundColor: '#F9FCFD',
              color: 'black',
              boxShadow: 'none',
            }}
          >
            {linkText}
          </Button>
        </LinkRouter>
      </Box>
    </Box>
  );
}
export default FlatCard;
