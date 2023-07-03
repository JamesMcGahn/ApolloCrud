import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FlipTextButton from '../ui/FlipTextButton';

function CallToActionHeader({
  title,
  subHeading,
  buttonText,
  buttonLink,
  image,
  altText,
}) {
  return (
    <div style={{ background: '#64b5f6' }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '3rem',
          minHeight: '50vh',
        }}
      >
        <Box
          sx={{
            width: '50%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="h5">{subHeading}</Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: '2rem',
            }}
          >
            <FlipTextButton link={buttonLink} btnText={buttonText} />
          </Box>
        </Box>
        <Box sx={{ width: '50%', padding: '1rem 1.5rem' }}>
          <img
            src={image}
            width="100%"
            style={{ borderRadius: '1.5rem' }}
            alt={altText}
          />
        </Box>
      </Container>
    </div>
  );
}
export default CallToActionHeader;
