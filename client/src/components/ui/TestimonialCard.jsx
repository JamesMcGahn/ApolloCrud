import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function TestimonialCard({ testimonial }) {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          padding: '1rem',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ mb: '1rem' }}>
          <Typography variant="h5" component="p">
            {`"${testimonial.text}"`}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" component="p">
            {`${testimonial.name}`}
          </Typography>
          <Typography variant="h6" component="p">
            {`${testimonial.company}`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '40%' }}>
        <img src={testimonial.image} width="100%" alt={testimonial.name} />
      </Box>
    </Box>
  );
}
export default TestimonialCard;
