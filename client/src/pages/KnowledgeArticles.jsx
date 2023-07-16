import { useState } from 'react';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import getAllArticles from '../graphql/queries/getAllArticles';
import Spinner from '../components/ui/LoadingSpinner';
import ArticleRoll from '../components/sections/ArticleRoll';
import loggedInUserQ from '../graphql/queries/loggedInUser';

function KnowledgeArticles() {
  const [page, setPage] = useState(1);
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const { loading, data, fetchMore } = useQuery(getAllArticles, {
    fetchPolicy: 'network-only',
    variables: { page: 1, status: 'published' },
  });
  // trunk-ignore(eslint/no-unsafe-optional-chaining)
  const pageCount = data?.articles.totalDocs / data?.articles.limit || 1;

  const handleOnClick = (e, num) => {
    setPage(num);
    fetchMore({ variables: { status: 'published', page: num } });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '80vw',
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <ArticleRoll
            linkBase={
              currentUser !== 'user'
                ? '/agent/knowledge'
                : '/customer/knowledge'
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
export default KnowledgeArticles;
