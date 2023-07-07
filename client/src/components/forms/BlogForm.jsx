import { useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ImageList from '@mui/material/ImageList';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import MDEditor from '@uiw/react-md-editor';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import getAllUsers from '../../graphql/queries/getAllUser';
import convert2FullDateTime from '../../utils/convert2FullDateTime';
import UserSelectionList from '../ui/UserSelectionList';
import LinkRouter from '../utils/LinkRouter';
import markdownWordCount from '../../utils/markdownWordCount';
import Spinner from '../ui/LoadingSpinner';

function BlogForm({ cb, create = true, blogData }) {
  const [blog, setBlog] = useState(blogData);
  const [value, setValue] = useState(blogData?.content);
  const [assignee, setAssignee] = useState(blogData?.author);
  const [wordCount, setWordCount] = useState(
    markdownWordCount(blogData.content),
  );
  const { data, loading: userLoading } = useQuery(getAllUsers, {
    variables: { roles: ['agent', 'lead', 'admin'] },
  });
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

  const handleAssignee = (changeAssignee) => {
    setAssignee(changeAssignee);
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

    if (create && (!blog.title || !assignee?.id || !blog.blurb || !value)) {
      toast.error('Please provide a Title, Author, Blurb and Content.');
      return;
    }

    cb(upBlog);
    setBlog({
      author: '',
      blurb: '',
      category: [],
      content: '',
      isPrivate: true,
      tags: [],
      status: 'draft',
      title: '',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        mt: '1rem',
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
          <Spinner />
        ) : (
          <UserSelectionList
            selectionList={data?.users}
            defaultValue={blog?.author.name}
            valueBy="name"
            cb={handleAssignee}
            label="Author"
            required
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
              (blog?.createdAt && convert2FullDateTime(blog?.createdAt)) ||
              'N/A'
            }`}
          </Typography>
          <Typography variant="subtext">
            {`Updated: ${
              (blog?.updatedAt && convert2FullDateTime(blog?.updatedAt)) ||
              'N/A'
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
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <LinkRouter
            to={`/agent/blogs/${blog.slug}/images`}
            underline="underline"
          >
            Update Images
          </LinkRouter>
        </Box>
        <ImageList sx={{ width: '100%', mt: 1 }} cols={4} rowHeight={150}>
          {blog?.images.map((img) => (
            <ImageListItem
              key={img.filename}
              sx={{
                '& button': {
                  fontSize: '.4rem',
                  color: 'white',
                  border: '1px white solid',
                  background: 'rgba(0, 0, 0, 0.5)',
                },
                '& button:hover': {
                  color: 'white',
                  border: '1px white solid',
                  background: 'rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              {blog?.featuredImage.url === img.url && (
                <Button
                  sx={{
                    color: 'white !important',
                    position: 'absolute',
                    zIndex: 100,
                    right: 10,
                    top: 10,
                    width: '50px',
                  }}
                  disabled
                >
                  Featured
                </Button>
              )}
              <img src={img.url} alt={img.filename} />
              <IconButton
                // trunk-ignore(eslint/no-undef)
                onClick={() => navigator.clipboard.writeText(img.url)}
                sx={{
                  border: 'none !important',
                  position: 'absolute',
                  zIndex: 100,
                  right: 10,
                  bottom: 10,
                  width: '50px',
                  padding: '2px ',
                  borderRadius: 1,
                }}
              >
                <ContentPasteIcon
                  sx={{
                    color: 'white',
                    fontSize: '1.5rem ',
                  }}
                />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            mt: '3rem',
          }}
        >
          <Button variant="contained" onClick={handleOnClick}>
            {create ? 'Create' : 'Update'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default BlogForm;
