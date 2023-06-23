import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

function LinkRouter({
  children,
  underline = 'hover',
  color = 'inherit',
  to,
  onClick,
  sx,
}) {
  return (
    <Link
      underline={underline}
      color={color}
      to={to}
      component={RouterLink}
      onClick={onClick}
      sx={sx}
    >
      {children}
    </Link>
  );
}

export default LinkRouter;
