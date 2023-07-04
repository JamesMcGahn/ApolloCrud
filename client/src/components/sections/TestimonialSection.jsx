import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TestimonialCard from '../ui/TestimonialCard';
import BottomTabPanel from '../navs/BottomTabPanel';

function TestimonialSection({ testimonials, title }) {
  const labels = testimonials.map((test) => test.name);
  const tabs = testimonials.map((test) => (
    <TestimonialCard testimonial={test} />
  ));

  return (
    <Box
      sx={{
        minHeight: '60vh',
        width: '100%',
        backgroundColor: '#2196F3',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5rem 0 2rem 0',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '80%' }}>
        <Typography variant="h3">{title}</Typography>
      </Box>
      <Box sx={{ display: 'flex', width: '80%' }}>
        <BottomTabPanel labels={labels} tabs={tabs} />
      </Box>
    </Box>
  );
}
export default TestimonialSection;
