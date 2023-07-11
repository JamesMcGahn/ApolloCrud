import Box from '@mui/material/Box';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import getAllArticles from '../graphql/queries/getAllArticles';
import AgentLayout from '../components/layout/AgentLayout';
import AgentBlogRoll from '../components/sections/AgentBlogRoll';

function AgentArticles() {
  const [qvars, setqVars] = useState(undefined);
  const [page, setPage] = useState(1);
  const { loading, data, fetchMore } = useQuery(getAllArticles, {
    variables: { page: 1 },
  });
  // trunk-ignore(eslint/no-unsafe-optional-chaining)
  const pageCount = data?.articles.totalDocs / data?.articles.limit || 1;

  const handleOnClick = (e, num) => {
    setPage(num);
    fetchMore({ variables: { status: qvars, page: num } });
  };

  const handleButton = (status) => {
    setqVars(status);
    setPage(1);
    fetchMore({ variables: { status: status, page: 1 } });
  };

  return (
    <AgentLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 2 }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minWidth: '80vw' }}
        >
          <AgentBlogRoll
            title="Articles"
            data={data?.articles}
            handleButton={handleButton}
            handlePageClick={handleOnClick}
            loading={loading}
            page={page}
            pageCount={pageCount}
            blogorArticle="articles"
            createLink="/agent/articles/create"
          />
        </Box>
      </Box>
    </AgentLayout>
  );
}
export default AgentArticles;
