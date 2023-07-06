import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import AgentLayout from '../components/layout/AgentLayout';
import getABlog from '../graphql/queries/getABlog';
import updateABlog from '../graphql/mutations/updateABlog';
import BlogForm from '../components/forms/BlogForm';
import Spinner from '../components/ui/LoadingSpinner';

function AgentBlog() {
  const { slug } = useParams();
  const nagivate = useNavigate();

  const [updateBlog, { data: uData, loading: uLoading }] = useMutation(
    updateABlog,
    {
      onCompleted: (ut) => {
        toast.success(`Updated Blog - ${ut.updateBlog.title}`);
        nagivate(`/agent/blogs/${ut.updateBlog.slug}`);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
  );
  const { data, loading } = useQuery(getABlog, {
    variables: { slug: slug },
  });

  const handleSubmit = (submitData) => {
    updateBlog({ variables: { updatePost: submitData, slug: slug } });
  };

  return (
    <AgentLayout>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        {loading || uLoading ? (
          <Spinner />
        ) : (
          <BlogForm
            create={false}
            blogData={uData?.updateBlog || data?.blog}
            cb={handleSubmit}
          />
        )}
      </Box>
    </AgentLayout>
  );
}
export default AgentBlog;
