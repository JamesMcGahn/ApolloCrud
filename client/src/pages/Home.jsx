import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomerLayout from '../components/layout/CustomerLayout';
import CallToActionHeader from '../components/sections/CallToActionHeader';
import FloatingMiddle from '../components/sections/FloatingMiddle';
import FlipTextButton from '../components/ui/FlipTextButton';
import FlatCard from '../components/ui/FlatCard';
import TestimonialSection from '../components/sections/TestimonialSection';
import ScreenImg from '../assets/images/computerScreen.jpeg';
import CodeImg from '../assets/images/codeScreen.jpeg';
import CustomerA from '../assets/images/customerA.jpg';
import CustomerB from '../assets/images/customerB.jpg';
import CustomerC from '../assets/images/customerC.jpg';
import CustomerD from '../assets/images/customerD.jpg';

const testimonials = [
  {
    name: 'CustomerA',
    company: 'Company',
    text: 'lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto laborum repudiandae facilis voluptatum fugiat nesciunt, veritatis doloribus a obcaecati id assumenda accusamus sit quia reiciendis ipsum neque eius alias eveniet!',
    image: CustomerA,
  },
  {
    name: 'CustomerB',
    company: 'Company',
    text: 'lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto laborum repudiandae facilis voluptatum fugiat nesciunt, veritatis doloribus a obcaecati id assumenda accusamus sit quia reiciendis ipsum neque eius alias eveniet!',
    image: CustomerB,
  },
  {
    name: 'CustomerC',
    company: 'Company',
    text: 'lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto laborum repudiandae facilis voluptatum fugiat nesciunt, veritatis doloribus a obcaecati id assumenda accusamus sit quia reiciendis ipsum neque eius alias eveniet!',
    image: CustomerC,
  },
  {
    name: 'CustomerD',
    company: 'Company',
    text: 'lorem ipsum dolor sit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto laborum repudiandae facilis voluptatum fugiat nesciunt, veritatis doloribus a obcaecati id assumenda accusamus sit quia reiciendis ipsum neque eius alias eveniet!',
    image: CustomerD,
  },
];

function Home() {
  return (
    <CustomerLayout>
      <Box sx={{ width: '100%' }}>
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
            <Box
              sx={{
                width: '30%',
                padding: '1rem 0 1rem  1rem',
                display: 'flex',
              }}
            >
              <img
                src={CodeImg}
                width="100%"
                style={{ borderRadius: '.5rem' }}
                alt="Screen with computer code"
              />
            </Box>
            <Box
              sx={{
                width: '55%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 1rem',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                Lorem ipsum dolor sit amet consectetur
              </Typography>
              <Typography variant="subtext">
                Adipisicing elit. Odit veniam natus neque cum, exercitationem
                enim voluptate inventore
              </Typography>
            </Box>
            <Box
              sx={{
                width: '15%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '1rem 1rem 0 0',
              }}
            >
              <FlipTextButton btnText="Read More" />
            </Box>
          </Box>
        </FloatingMiddle>
        <Box
          sx={{
            background: '#2c3e50',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30vh',
            padding: '4rem 0',
          }}
        >
          <Box
            sx={{
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '60vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: '3rem',
              }}
            >
              <Typography variant="h3" sx={{ mb: 1, fontSize: '3rem' }}>
                Lorem ipsum dolor sit amet consectetur
              </Typography>
              <Typography variant="subtext" sx={{ mb: 1, fontSize: '1.2rem' }}>
                Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Exercitationem,
                necessitatibus nostrum! Labore ut facilis est corrupti excepturi
                iure suscipit provident ullam, beatae iste sunt pariatur.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ width: '30%' }}>
                <FlatCard
                  linkText="Read More"
                  link="/"
                  title="Lorem ipsum dolor sit amet consectetur"
                  content={`Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
                necessitatibus nostrum! Labore ut facilis est corrupti excepturi
                iure suscipit provident ullam, beatae iste sunt pariatur.`}
                />
              </Box>
              <Box sx={{ width: '30%' }}>
                <FlatCard
                  linkText="Read More"
                  link="/"
                  title="Lorem ipsum dolor sit amet consectetur"
                  content={`Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
                necessitatibus nostrum! Labore ut facilis est corrupti excepturi
                iure suscipit provident ullam, beatae iste sunt pariatur.`}
                />
              </Box>
              <Box sx={{ width: '30%' }}>
                <FlatCard
                  linkText="Read More"
                  link="/"
                  title="Lorem ipsum dolor sit amet consectetur"
                  content={`Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
                necessitatibus nostrum! Labore ut facilis est corrupti excepturi
                iure suscipit provident ullam, beatae iste sunt pariatur.`}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <TestimonialSection
          title="Lorem ipsum dolor sit amet,"
          testimonials={testimonials}
        />

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#64b5f6',
            padding: '2rem 0',
          }}
        >
          <Box
            sx={{
              borderTop: '1px solid rgba(255, 255, 255, 0.6)',
              width: '80%',
              height: '1vh',
            }}
          />
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-start', width: '80%' }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Lorem ipsum dolor sit amet consectetur
            </Typography>
          </Box>
        </Box>
      </Box>
    </CustomerLayout>
  );
}
export default Home;
