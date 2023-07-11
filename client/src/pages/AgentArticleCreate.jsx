import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import AgentLayout from '../components/layout/AgentLayout';
import createAnArticle from '../graphql/mutations/createAnArticle';
import BlogForm from '../components/forms/BlogForm';

function AgentArticleCreate() {
  const nagivate = useNavigate();

  const [createArticle] = useMutation(createAnArticle, {
    onCompleted: (ut) => {
      toast.success(`Updated Article - ${ut.createArticle.title}`);
      nagivate(`/agent/articles/${ut.createArticle.slug}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (submitData) => {
    createArticle({ variables: { newPost: submitData } });
  };

  const defaultArticle = {
    author: '',
    blurb: '',
    category: '',
    content: '',
    isPrivate: true,
    tags: [],
    status: 'draft',
    title: '',
  };

  return (
    <AgentLayout>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <BlogForm
          create
          blogData={defaultArticle}
          cb={handleSubmit}
          blogorArticle="article"
        />
      </Box>
    </AgentLayout>
  );
}
export default AgentArticleCreate;
