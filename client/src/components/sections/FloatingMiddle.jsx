import Container from '@mui/material/Container';

function FloatingMiddle({
  topDivColor,
  bottomDivColor,
  floatDivColor,
  children,
}) {
  return (
    <Container
      sx={{
        height: '30vh',
        position: 'absolute',
        minWidth: '100% !important',
        margin: 0,
        padding: '0 !important',
      }}
    >
      <div style={{ height: '17vh', background: topDivColor }} />
      <div
        style={{
          position: 'absolute',
          top: '5vh',
          left: '10%',
          height: '25vh',
          width: '80%',
          background: floatDivColor,
          zIndex: 15,
          borderRadius: '.5rem',
        }}
      >
        {children}
      </div>
      <div style={{ height: '14vh', background: bottomDivColor }} />
    </Container>
  );
}
export default FloatingMiddle;
