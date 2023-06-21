import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const muiTheme = createTheme({
  palette: {
    info: {
      main: grey[500],
    },
  },
  typography: {
    fontFamily: ['Average Sans', 'sans-serif'].join(','),
  },
});

export default muiTheme;
