import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import getABlog from '../../../graphql/queries/getABlog';
import Spinner from '../../../components/ui/LoadingSpinner';
import BlogSuggested from '../../../components/sections/BlogSuggested';
import PostId from '../../../components/cards/PostId';

function BlogId() {
  const { slug } = useParams();
  const { data, loading } = useQuery(getABlog, {
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
            <PostId linkBase="/blog" data={data?.blog} />
          )}
        </Box>
      </Box>
      <BlogSuggested slug={slug} />
    </>
  );
}
export default BlogId;
