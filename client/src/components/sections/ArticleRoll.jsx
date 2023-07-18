import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Markdown from 'markdown-to-jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LinkRouter from '../utils/LinkRouter';
import markdownRemoveImages from '../../utils/markdownRemoveImg';

function ArticleRoll({ data, handlePageClick, page, pageCount, linkBase }) {
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          minHeight: '80vh',
          margin: '1rem 2rem',
          gap: '1rem',
        }}
      >
        {data?.posts &&
          data.posts.map((post) => {
            return (
              <LinkRouter
                to={`${linkBase}/${post.slug}`}
                key={post.id}
                underline="none"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <LazyLoadImage
                    placeholderSrc={post.featuredImage.url.replace(
                      '/upload',
                      '/upload/w_20',
                    )}
                    delayTime={500}
                    width="100%"
                    effect="blur"
                    src={post.featuredImage.url}
                    alt={post.featuredImage.filename}
                  />

                  <CardContent sx={{ pt: 0, pb: 0, '& h1': { margin: 0 } }}>
                    <Markdown>
                      {truncateString(markdownRemoveImages(post.content), 300)}
                    </Markdown>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <LinkRouter to={`${linkBase}/${post.slug}`}>
                      <Button size="small">Learn More</Button>
                    </LinkRouter>
                  </CardActions>
                </Card>
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
export default ArticleRoll;
