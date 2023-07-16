import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import getAllArticles from '../graphql/queries/getAllArticles';
import Spinner from '../components/ui/LoadingSpinner';
import loggedInUserQ from '../graphql/queries/loggedInUser';

import ArticleRoll from '../components/sections/ArticleRoll';

function BlogCategory() {
  const { tag } = useParams();
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const [page, setPage] = useState(1);
  const { loading, data, fetchMore } = useQuery(getAllArticles, {
    fetchPolicy: 'network-only',
    variables: { page: 1, tag: tag, status: 'published' },
  });
  // trunk-ignore(eslint/no-unsafe-optional-chaining)
  const pageCount = data?.articles.totalDocs / data?.articles.limit || 1;

  const handleOnClick = (e, num) => {
    setPage(num);
    fetchMore({ variables: { status: 'published', page: num } });
    // trunk-ignore(eslint/no-undef)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '80vw' }}>
        {loading ? (
          <Spinner />
        ) : (
          <ArticleRoll
            linkBase={
              currentUser !== 'user'
                ? `/agent/knowledge/tags/${tag}`
                : `/customer/knowledge/tags/${tag}`
            }
            data={data?.articles}
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
