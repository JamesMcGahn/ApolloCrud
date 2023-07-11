import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import AgentLayout from '../components/layout/AgentLayout';
import getAnArticle from '../graphql/queries/getAnArticle';
import deleteAnArticle from '../graphql/mutations/deleteAnArticle';
import updateAnArticle from '../graphql/mutations/updateAnArticle';
import BlogForm from '../components/forms/BlogForm';
import Spinner from '../components/ui/LoadingSpinner';

function AgentBlog() {
  const { slug } = useParams();
  const nagivate = useNavigate();

  const [updateArticle, { data: uData, loading: uLoading }] = useMutation(
    updateAnArticle,
    {
      onCompleted: (ut) => {
        toast.success(`Updated Article - ${ut.updateArticle.title}`);
        nagivate(`/agent/articles/${ut.updateArticle.slug}`);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
  );

  const [deleteArticle] = useMutation(deleteAnArticle, {
    variables: { slug: slug },
    onCompleted: (dt) => {
      toast.success(`Deleted Article - ${dt.deleteArticle.title}`);
      nagivate('/agent/articles/');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { data, loading } = useQuery(getAnArticle, {
    variables: { slug: slug },
  });

  const handleSubmit = (submitData) => {
    updateArticle({ variables: { updatePost: submitData, slug: slug } });
  };

  const handleDelete = () => {
    deleteArticle();
  };

  return (
    <AgentLayout>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        {loading || uLoading ? (
          <Spinner />
        ) : (
          <BlogForm
            create={false}
            blogData={uData?.updateArticle || data?.article}
            cb={handleSubmit}
            handleDelete={handleDelete}
            blogorArticle="article"
          />
        )}
      </Box>
    </AgentLayout>
  );
}
export default AgentBlog;
