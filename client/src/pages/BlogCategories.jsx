import Box from '@mui/material/Box';
import { useQuery, gql } from '@apollo/client';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LinkRouter from '../components/utils/LinkRouter';
import CustomerLayout from '../components/layout/CustomerLayout';
import Spinner from '../components/ui/LoadingSpinner';

function Categories() {
  const { data, loading } = useQuery(gql`
    query Query {
      blogsCategories
    }
  `);

  return (
    <CustomerLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 2 }}>
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
              Categories
            </Typography>
            <Typography>
              Maecenas nec dui arcu. Donec posuere at sapien id scelerisque. Ut
              lacinia purus et porttitor convallis. Nullam vitae arcu ac velit
              congue euismod nec ac urna. Integer vel congue justo, rutrum
              faucibus neque. Fusce dictum in lectus non ultricies. Curabitur
              sit amet orci massa. Nullam non imperdiet nunc, ac malesuada orci.
              Phasellus mattis, neque vitae blandit condimentum, lectus nunc
              sagittis neque, feugiat suscipit nunc dolor et odio.
            </Typography>
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
                  {data?.blogsCategories.map((cat) => (
                    <ListItem disablePadding key={cat} sx={{ width: '25%' }}>
                      <LinkRouter
                        to={`/blog/categories/${cat}`}
                        underline="none"
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <BookmarkBorderIcon />
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
      </Box>
    </CustomerLayout>
  );
}
export default Categories;
