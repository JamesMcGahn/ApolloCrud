import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LinkRouter from '../utils/LinkRouter';
import Spinner from '../ui/LoadingSpinner';

function PostCategories({
  linkBase,
  data,
  loading,
  children,
  title = 'Categories',
  icon,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '80vw',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          padding: '1.5rem',
          borderRadius: '.5rem',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          width: '60%',
          mb: 1,
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography>{children}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '40vh',
          margin: '1rem 0',
          gap: '1rem',
          width: '60%',
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              display: 'flex',

              width: '100%',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '1.5rem',
              borderRadius: '.5rem',

              gap: '1rem',
              boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
            }}
          >
            <List sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
              {data.map((cat) => (
                <ListItem disablePadding key={cat} sx={{ width: '25%' }}>
                  <LinkRouter to={`${linkBase}/${cat}`} underline="none">
                    <ListItemButton>
                      <ListItemIcon>
                        {icon || <BookmarkBorderIcon />}
                      </ListItemIcon>
                      <ListItemText primary={cat} />
                    </ListItemButton>
                  </LinkRouter>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default PostCategories;
