import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import MDEditor from '@uiw/react-md-editor';
import Box from '@mui/material/Box';
import AgentLayout from '../components/layout/AgentLayout';
import getABlog from '../graphql/queries/getABlog';
import updateABlog from '../graphql/mutations/updateABlog';
import getAllUsers from '../graphql/queries/getAllUser';
import convert2FullDateTime from '../utils/convert2FullDateTime';
import UserSelectionList from '../components/ui/UserSelectionList';
import markdownWordCount from '../utils/markdownWordCount';

function AgentBlog() {
  const { slug } = useParams();
  const nagivate = useNavigate();
  const [blog, setBlog] = useState();
  const [value, setValue] = useState();
  const [assignee, setAssignee] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [updateBlog] = useMutation(updateABlog, {
    onCompleted: (ut) => {
      toast.success(`Updated Blog - ${ut.updateBlog.title}`);

      setBlog(ut.updateBlog);
      setAssignee(ut.updateBlog.author);
      setValue(ut.updateBlog.content);
      setWordCount(markdownWordCount(ut.updateBlog.content));
      nagivate(`/agent/blogs/${ut.updateBlog.slug}`);
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  const { loading } = useQuery(getABlog, {
    variables: { slug: slug },
    onCompleted: (dt) => {
      setBlog(dt.blog);
      setValue(dt.blog.content);
      setAssignee(dt.blog.author);
      setWordCount(markdownWordCount(dt.blog.content));
    },
  });
  const { data, loading: userLoading } = useQuery(getAllUsers, {
    variables: { roles: ['agent', 'lead', 'admin'] },
  });

  const handleAssignee = (changeAssignee) => {
    setAssignee(changeAssignee);
  };

  const handleOnChange = (e) => {
    if (e.target.name === 'category' || e.target.name === 'tags') {
      setBlog((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.split(', '),
      }));
      return;
    }

    if (e.target.name === 'isPrivate') {
      setBlog((prev) => ({
        ...prev,
        [e.target.name]: e.target.value === 'private',
      }));
      return;
    }
    setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClick = () => {
    const upBlog = {
      author: assignee.id,
      blurb: blog.blurb,
      category: blog.category,
      content: value,

      isPrivate: blog.isPrivate,
      tags: blog.tags,
      status: blog.status,
      title: blog.title,
    };

    updateBlog({ variables: { updatePost: upBlog, slug: slug } });
  };

  return (
    <AgentLayout>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        {loading ? (
          'loading'
        ) : (
          // trunk-ignore(eslint/react/jsx-no-useless-fragment)
          <>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '40%',
                }}
              >
                {userLoading ? (
                  loading
                ) : (
                  <UserSelectionList
                    selectionList={data?.users}
                    defaultValue={blog?.author.name}
                    valueBy="name"
                    cb={handleAssignee}
                    label="Assignee"
                    sxStyles={{ m: 1, width: '100%', mt: 1 }}
                  />
                )}
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    name="title"
                    label="title"
                    variant="outlined"
                    onChange={handleOnChange}
                    value={blog?.title}
                    required
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Blurb"
                    name="blurb"
                    required
                    onChange={handleOnChange}
                    multiline
                    rows={4}
                    value={blog?.blurb}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    name="category"
                    label="category"
                    variant="outlined"
                    onChange={handleOnChange}
                    value={blog?.category.join(', ')}
                    helperText="Enter categories comma separated. ex: featured, new"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    name="tags"
                    label="Tags"
                    variant="outlined"
                    onChange={handleOnChange}
                    value={blog?.tags.join(', ')}
                    helperText="Enter tags comma separated. ex: featured, new"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    required
                    value={blog?.status}
                    name="status"
                    label="Status"
                    helperText="Please select your currency"
                    onChange={handleOnChange}
                  >
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                  </TextField>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    required
                    value={blog?.isPrivate ? 'Private' : 'Public'}
                    name="isPrivate"
                    label="Private:"
                    onChange={handleOnChange}
                  >
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                  </TextField>
                </FormControl>
              </Box>

              <Box sx={{ width: '55%', padding: '0 1rem' }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="subtext">
                    {`Created: ${
                      blog?.createdAt && convert2FullDateTime(blog?.createdAt)
                    }`}
                  </Typography>
                  <Typography variant="subtext">
                    {`Updated: ${
                      blog?.updatedAt && convert2FullDateTime(blog?.updatedAt)
                    }`}
                  </Typography>
                </Box>
                <MDEditor
                  preview="live"
                  value={value}
                  onChange={(val) => {
                    setValue(val);
                    setWordCount(markdownWordCount(val));
                  }}
                  height={400}
                />
                {`Word Count: ${wordCount}`}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    mt: '15%',
                  }}
                >
                  <Button variant="contained" onClick={handleOnClick}>
                    Update
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </AgentLayout>
  );
}
export default AgentBlog;
