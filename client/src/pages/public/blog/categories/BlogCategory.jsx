import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import getAllBlogs from '../../../../graphql/queries/getAllBlogs';
import Spinner from '../../../../components/ui/LoadingSpinner';
import BlogRoll from '../../../../components/sections/BlogRoll';

function BlogCategory() {
  const { category } = useParams();

  const [page, setPage] = useState(1);
  const { loading, data, fetchMore } = useQuery(getAllBlogs, {
    fetchPolicy: 'network-only',
    variables: { page: 1, category: category },
  });
  // trunk-ignore(eslint/no-unsafe-optional-chaining)
  const pageCount = data?.blogs.totalDocs / data?.blogs.limit || 1;

  const handleOnClick = (e, num) => {
    setPage(num);
    fetchMore({
      variables: { status: 'published', category: category, page: num },
    });
    // trunk-ignore(eslint/no-undef)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '80vw' }}>
        {loading ? (
          <Spinner />
        ) : (
          <BlogRoll
            linkBase={`/blog/categories/${category}`}
            data={data?.blogs}
            page={page}
            pageCount={pageCount}
            handlePageClick={handleOnClick}
          />
        )}
      </Box>
    </Box>
  );
}
export default BlogCategory;
