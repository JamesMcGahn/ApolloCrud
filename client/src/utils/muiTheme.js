import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const muiTheme = createTheme({
  palette: {
    info: {
      main: grey[500],
    },
  },
});

export default muiTheme;
