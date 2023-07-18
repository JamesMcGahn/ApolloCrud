import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Box from '@mui/material/Box';
import getBlogsSuggested from '../../graphql/queries/getBlogsSuggested';
import Spinner from '../ui/LoadingSpinner';
import LinkRouter from '../utils/LinkRouter';

function BlogSuggested({ slug, title = 'Suggested Blogs' }) {
  const { data, loading } = useQuery(getBlogsSuggested, {
    variables: { slug: slug },
  });

  function truncateString(str, num) {
    if (str.length > num) {
      return `${str.slice(0, num)}...`;
    }
    return str;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '2.5rem 0',
        background: '#64b5f6',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '80%',
          gap: 3,
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">{title}</Typography>
        {loading ? (
          <Spinner />
        ) : (
          <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
            <LinkRouter
              to={`/blog/${data?.blogSuggested[0].slug}`}
              underline="none"
              sx={{ width: '25%', display: 'flex' }}
            >
              <Box
                sx={{
                  background: '#F9FCFD',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '.5rem',
                  padding: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow:
                    'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', mb: '3px' }}>
                  <LazyLoadImage
                    delayTime={500}
                    placeholderSrc={data?.blogSuggested[0].featuredImage.url.replace(
                      '/upload',
                      '/upload/w_20',
                    )}
                    src={data?.blogSuggested[0].featuredImage.url}
                    alt={data?.blogSuggested[0].featuredImage.alt}
                    width="100%"
                    style={{ borderRadius: '.5rem', display: 'flex' }}
                    effect="blur"
                  />
                </Box>
                <Box>
                  <Box>
                    <strong>{data?.blogSuggested[0].title}</strong>
                  </Box>
                  <Box>
                    {data?.blogSuggested[0].blurb &&
                      truncateString(data?.blogSuggested[0].blurb, 200)}
                  </Box>
                </Box>
              </Box>
            </LinkRouter>
            <Box
              sx={{ width: '75%', display: 'flex', flexWrap: 'wrap', gap: 1 }}
            >
              {data?.blogSuggested.map((blog, i) => {
                if (i === 0) return;
                return (
                  <LinkRouter
                    to={`/blog/${blog.slug}`}
                    key={blog.id}
                    underline="none"
                    sx={{ width: '49%', display: 'flex', gap: 1 }}
                  >
                    <Box
                      sx={{
                        background: '#F9FCFD',
                        width: '100%',
                        display: 'flex',
                        borderRadius: '.5rem',
                        padding: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        gap: 1,
                        boxShadow:
                          'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                      }}
                    >
                      <Box
                        sx={{
                          width: '50%',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <LazyLoadImage
                          placeholderSrc={blog.featuredImage.url.replace(
                            '/upload',
                            '/upload/w_20',
                          )}
                          delayTime={500}
                          src={blog.featuredImage.url}
                          alt={blog.featuredImage.alt}
                          width="100%"
                          effect="blur"
                          style={{ borderRadius: '.5rem', display: 'flex' }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: '50%',
                          flexDirection: 'column',
                          display: 'flex',
                        }}
                      >
                        <strong>{blog?.title}</strong>
                        {blog?.blurb && truncateString(blog?.blurb, 120)}
                      </Box>
                    </Box>
                  </LinkRouter>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default BlogSuggested;
