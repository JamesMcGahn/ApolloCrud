import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import getAnArticle from '../graphql/queries/getAnArticle';
import Spinner from '../components/ui/LoadingSpinner';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import BlogSuggested from '../components/sections/BlogSuggested';
import PostId from '../components/cards/PostId';

function ArticleId() {
  const { slug } = useParams();
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const { data, loading } = useQuery(getAnArticle, {
    variables: { slug: slug },
  });

  return (
    <>
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
            <PostId
              linkBase={
                currentUser !== 'user'
                  ? '/agent/knowledge'
                  : '/customer/knowledge'
              }
              data={data?.article}
            />
          )}
        </Box>
      </Box>
      {/* <BlogSuggested slug={slug} /> */}
    </>
  );
}
export default ArticleId;
