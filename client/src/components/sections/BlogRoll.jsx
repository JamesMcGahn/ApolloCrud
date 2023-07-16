import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Markdown from 'markdown-to-jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import LinkRouter from '../utils/LinkRouter';
import markdownRemoveImages from '../../utils/markdownRemoveImg';

function BlogRoll({ data, handlePageClick, page, pageCount, linkBase }) {
  function truncateString(str, num) {
    if (str.length > num) {
      return `${str.slice(0, num)}...`;
    }
    return str;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '80vh',
          margin: '1rem 0',
          gap: '1rem',
        }}
      >
        {data?.posts &&
          data.posts.map((post, i) => {
            return (
              <LinkRouter
                to={`${linkBase}/${post.slug}`}
                key={post.id}
                underline="none"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: `${i % 2 === 0 ? 'row' : 'row-reverse'}`,
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
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '40%',
                    }}
                  >
                    <LazyLoadImage
                      placeholderSrc={post.featuredImage.url.replace(
                        '/upload',
                        '/upload/w_20',
                      )}
                      src={post.featuredImage.url}
                      alt={post.featuredImage.filename}
                      width="100%"
                      effect="blur"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '60%',
                    }}
                  >
                    <Box sx={{ padding: '1rem' }}>
                      <Markdown>
                        {truncateString(
                          markdownRemoveImages(post.content),
                          300,
                        )}
                      </Markdown>
                    </Box>
                  </Box>
                </Box>
              </LinkRouter>
            );
          })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Pagination
          page={page}
          count={Math.ceil(pageCount || 1)}
          variant="outlined"
          shape="rounded"
          onChange={handlePageClick}
        />
      </Box>
    </>
  );
}
export default BlogRoll;
