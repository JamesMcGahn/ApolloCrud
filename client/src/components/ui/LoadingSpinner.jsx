import Container from '@mui/material/Container';
import PropagateLoader from 'react-spinners/PropagateLoader';

function Spinner() {
  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#007aff',
  };
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <PropagateLoader
        color="#007aff"
        loading
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Container>
  );
}
export default Spinner;
