import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import getAnArticle from '../../../../graphql/queries/getAnArticle';
import AgentBlogImage from '../../../../components/forms/AgentBlogImage';

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
  );
}
export default ArticleImages;
