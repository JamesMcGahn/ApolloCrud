import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import convert2FullDateTime from '../../utils/convert2FullDateTime';
import truncateString from '../../utils/truncateString';
import LinkRouter from '../utils/LinkRouter';
import Spinner from '../ui/LoadingSpinner';

function AgentBlogRoll({
  title,
  data,
  handleButton,
  loading,
  handlePageClick,
  page,
  pageCount,
  createLink,
  blogorArticle,
}) {
  return (
    <>
      <Box
        sx={{
          marginLeft: '10%',
          width: '80%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Box>
          <LinkRouter to={createLink} underline="none" sx={{ mr: 1 }}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button color="warning">Create</Button>
            </ButtonGroup>
          </LinkRouter>

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => handleButton(null)}>All</Button>
            <Button onClick={() => handleButton('draft')}>Drafts</Button>
            <Button onClick={() => handleButton('published')}>Published</Button>
          </ButtonGroup>
        </Box>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
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
              data?.posts.map((post) => {
                return (
                  <LinkRouter
                    to={`/agent/${
                      blogorArticle !== 'blogs' ? 'articles' : 'blogs'
                    }/${post.slug}`}
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
                        width: '80%',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '1.5rem',
                        borderRadius: '.5rem',
                        minHeight: '10vh',
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
                          width: '10%',
                        }}
                      >
                        <Box>
                          <strong>Author:</strong>
                        </Box>
                        <Box>{post.author.name}</Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          width: '25%',
                        }}
                      >
                        <Box>
                          <strong>Title:</strong>
                        </Box>
                        <Box>{truncateString(post.title, 30)}</Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          width: '25%',
                        }}
                      >
                        <Box>
                          <strong>Created At:</strong>
                        </Box>
                        <Box>{convert2FullDateTime(post.createdAt)}</Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          width: '25%',
                        }}
                      >
                        <Box>
                          <strong>Updated At:</strong>
                        </Box>
                        <Box>{convert2FullDateTime(post.updatedAt)}</Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          width: '5%',
                        }}
                      >
                        <Box>
                          <strong>Status:</strong>
                        </Box>
                        <Box>
                          <Chip
                            label={`${
                              post.status.charAt(0).toUpperCase() +
                              post.status.slice(1)
                            }`}
                            sx={{ width: '100%' }}
                            color={
                              post.status === 'published'
                                ? 'success'
                                : 'warning'
                            }
                          />
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
      )}
    </>
  );
}
export default AgentBlogRoll;
