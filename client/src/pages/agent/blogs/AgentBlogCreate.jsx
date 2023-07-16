import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import createABlog from '../../../graphql/mutations/createABlog';
import BlogForm from '../../../components/forms/BlogForm';

function AgentBlog() {
  const nagivate = useNavigate();

  const [createBlog] = useMutation(createABlog, {
    onCompleted: (ut) => {
      toast.success(`Updated Blog - ${ut.createBlog.title}`);
      nagivate(`/agent/blogs/${ut.createBlog.slug}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (submitData) => {
    createBlog({ variables: { newPost: submitData } });
  };

  const defaultBlog = {
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
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <BlogForm create blogData={defaultBlog} cb={handleSubmit} />
    </Box>
  );
}
export default AgentBlog;
