import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import AgentLayout from '../components/layout/AgentLayout';
import getAnArticle from '../graphql/queries/getAnArticle';
import AgentBlogImage from '../components/forms/AgentBlogImage';

function ArticleImages() {
  const { slug } = useParams();
  const [featured, setFeatured] = useState({
    url: null,
    filename: null,
  });
  const { data, loading, refetch } = useQuery(getAnArticle, {
    variables: { slug: slug },
    onCompleted: (da) => {
      setFeatured(da.article.featuredImage);
    },
  });

  return (
    <AgentLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: '1rem',
        }}
      >
        <AgentBlogImage
          slug={slug}
          data={data?.article}
          loading={loading}
          featured={featured}
          setFeatured={setFeatured}
          refetch={refetch}
        />
      </Box>
    </AgentLayout>
  );
}
export default ArticleImages;
