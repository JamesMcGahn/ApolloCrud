import Button from '@mui/material/Button';
import LinkRouter from '../utils/LinkRouter';

function FlipTextButton({
  initialBtnColor = '#1976d2',
  hoverBtnCover = '#2c3e50',
  link,
  btnText,
}) {
  return (
    <LinkRouter
      to={link}
      sx={{
        '& span::before': {
          transition: 'all 0.6s cubic-bezier(0.85, 0, 0.15, 1) 0s',
        },
        '& span:nth-of-type(even)': {
          position: 'absolute',
          top: '80%',
          color: 'transparent',
        },
        '& button:hover': {
          backgroundColor: hoverBtnCover,
        },
        '& button:hover span:nth-of-type(odd)': {
          transition: 'all 0.51s cubic-bezier(0.7, 0, 0.3, 1) 0s',
          transform: 'translateY(-100%)',
          color: 'transparent',
        },
        '& button:hover span:nth-of-type(even)': {
          display: 'inline',
          fontWeight: 'bold',
          color: 'white',
          transform: 'translateY(-110%)',
          transition: 'all 0.51s cubic-bezier(0.7, 0, 0.3, 1) 0s',
        },
      }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: '1.5rem',
          padding: '.7rem',
          width: '100%',
          backgroudColor: { initialBtnColor },
        }}
      >
        <span>{btnText}</span>
        <span>{btnText}</span>
      </Button>
    </LinkRouter>
  );
}
export default FlipTextButton;
