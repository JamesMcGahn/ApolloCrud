import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import AgentLayout from '../components/layout/AgentLayout';
import getABlog from '../graphql/queries/getABlog';
import AgentBlogImage from '../components/forms/AgentBlogImage';

function BlogImages() {
  const { slug } = useParams();
  const [featured, setFeatured] = useState({
    url: null,
    filename: null,
  });
  const { data, loading, refetch } = useQuery(getABlog, {
    variables: { slug: slug },
    onCompleted: (da) => {
      setFeatured(da.blog.featuredImage);
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
          data={data?.blog}
          loading={loading}
          featured={featured}
          setFeatured={setFeatured}
          refetch={refetch}
        />
      </Box>
    </AgentLayout>
  );
}
export default BlogImages;
