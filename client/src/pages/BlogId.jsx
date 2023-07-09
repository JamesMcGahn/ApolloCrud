import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import getABlog from '../graphql/queries/getABlog';
import CustomerLayout from '../components/layout/CustomerLayout';
import Spinner from '../components/ui/LoadingSpinner';
import LinkRouter from '../components/utils/LinkRouter';
import BlogSuggested from '../components/sections/BlogSuggested';

const LazyLoadWrap = ({ alt, src }) => {
  const regex = /(right|left)/;
  const floatDirectMatch = alt.match(regex);
  let floatDirection;
  if (floatDirectMatch?.length > 0) {
    floatDirection = floatDirectMatch[0];
  }

  return (
    <span
      style={{
        width: `${!floatDirection ? '100%' : 'inherit'}`,
        display: `${!floatDirection ? 'flex' : 'block'}`,
        justifyContent: `${!floatDirection ? 'center' : 'inherit'}`,
        padding: `${!floatDirection ? '1.5rem 0' : 0}`,
      }}
    >
      <span
        style={{
          maxWidth: `${floatDirection ? '20vw' : '60vw'}`,
          float: `${floatDirection || 'none'}`,
          marginLeft: `${floatDirection === 'right' && '1rem'}`,
          marginRight: `${floatDirection === 'left' && '1rem'}`,
        }}
      >
        <LazyLoadImage src={src} alt={alt} width="100%" effect="blur" />
      </span>
    </span>
  );
};

function BlogId() {
  const { slug } = useParams();
  const { data, loading } = useQuery(getABlog, {
    variables: { slug: slug },
  });

  return (
    <CustomerLayout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          mb: '3.5rem',
          minHeight: '80vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '80vw',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <Box
              sx={{
                width: '80%',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '1.5rem',
                borderRadius: '.5rem',

                gap: '1rem',
                boxShadow:
                  'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  '& .MuiChip-root:hover': {
                    cursor: 'pointer',
                    boxShadow:
                      'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                  },
                }}
              >
                <LinkRouter
                  to={`/blog/categories/${data?.blog.category}`}
                  underline="none"
                >
                  <Chip label={data?.blog.category} />
                </LinkRouter>
              </Box>
              <Box>
                <Markdown
                  options={{
                    overrides: {
                      img: {
                        component: LazyLoadWrap,
                        props: {
                          className: 'foo',
                        },
                      },
                    },
                  }}
                >
                  {data?.blog.content}
                </Markdown>
              </Box>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    width: '40%',
                    maxWidth: '20vw',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '1.5rem',
                    borderRadius: '.5rem',

                    boxShadow:
                      'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                  }}
                >
                  <Box
                    sx={{
                      width: '25%',

                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: blue[500],
                        width: 85,
                        height: 85,
                      }}
                      aria-label="avatar"
                    >
                      {`${data?.blog.author.name[0].toUpperCase()}${
                        data?.blog.author.name?.split(' ')[1]
                          ? data?.blog.author.name?.split(' ')[1][0]
                          : ''
                      }`}
                    </Avatar>
                  </Box>
                  <Box
                    sx={{
                      width: '75%',
                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                    }}
                  >
                    <Box>
                      <strong>Author: </strong>
                      {data?.blog.author.name}
                    </Box>
                    {data?.blog.author.email && (
                      <Box>
                        <strong>Email: </strong>
                        {data?.blog.author.email}
                      </Box>
                    )}

                    <Box>
                      <strong>Role: </strong>
                      {`${data?.blog.author.role[0].toUpperCase()}${data?.blog.author.role.slice(
                        1,
                      )}`}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <BlogSuggested slug={slug} />
    </CustomerLayout>
  );
}
export default BlogId;
