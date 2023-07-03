import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomerLayout from '../components/layout/CustomerLayout';
import CallToActionHeader from '../components/sections/CallToActionHeader';
import ScreenImg from '../assets/images/computerScreen.jpeg';
import CodeImg from '../assets/images/codeScreen.jpeg';
import FloatingMiddle from '../components/sections/FloatingMiddle';
import FlipTextButton from '../components/ui/FlipTextButton';

function Home() {
  return (
    <CustomerLayout>
      <CallToActionHeader
        title="Leverage the Possiblities of Performance."
        subHeading="lorem ipsum dolor sit amet, consectetur adip. lorem ipsum dolor sit amet"
        image={ScreenImg}
        buttonText="Find Out More"
      />
      <FloatingMiddle
        topDivColor="#64b5f6"
        bottomDivColor="#2c3e50"
        floatDivColor="#f9fcfd"
      >
        <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
          <Box sx={{ width: '30%', padding: '1rem 0 1rem  1rem' }}>
            <img src={CodeImg} width="100%" alt="Screen with computer code" />
          </Box>
          <Box
            sx={{
              width: '55%',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 1rem',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>
              Lorem ipsum dolor sit amet consectetur
            </Typography>
            <Typography variant="subtext">
              Adipisicing elit. Odit veniam natus neque cum, exercitationem enim
              voluptate inventore
            </Typography>
          </Box>
          <Box
            sx={{
              width: '15%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '1rem 1rem 0 1rem',
            }}
          >
            <FlipTextButton btnText="Read More" />
          </Box>
        </Box>
      </FloatingMiddle>
    </CustomerLayout>
  );
}
export default Home;
