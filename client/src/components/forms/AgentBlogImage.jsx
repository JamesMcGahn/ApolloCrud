import Box from '@mui/material/Box';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Spinner from '../ui/LoadingSpinner';

function AgentBlogImage({
  slug,
  data,
  loading,
  refetch,
  featured,
  setFeatured,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    images: [],
    deleteImage: [],
  });

  const sendImageUpdate = async () => {
    const sendForm = new FormData();
    form.images.forEach((file) => sendForm.append('images', file));
    form.deleteImage.forEach((name) => sendForm.append('delete[]', name));
    sendForm.append('featuredImage', JSON.stringify(featured));
    try {
      setSubmitting(true);
      await axios
        .put(
          `${process.env.REACT_APP_BE_DOMAIN}/api/v1/images/blog/${slug}`,
          sendForm,
          {
            withCredentials: true,
            headers: { 'content-type': 'multipart/form-data' },
          },
        )
        .then((res) => {
          toast.success('Images Updated.');
          refetch();
          setSubmitting(false);
          setForm({
            images: [],
            deleteImage: [],
          });
        });
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      setForm({ ...form, [e.target.name]: [...e.target.files] });
    }
    if (e.target.name === 'delete[]') {
      if (e.target.checked) {
        setForm({
          ...form,
          deleteImage: [...form.deleteImage, e.target.value],
        });
      }
      if (!e.target.checked) {
        const remainingCheck = form.deleteImage.filter(
          (item) => item !== e.target.value,
        );
        setForm({ ...form, deleteImage: remainingCheck });
      }
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    sendImageUpdate();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem',
        width: '60vw',
        border: '1px solid rgba(255, 255, 255, 0.12)',

        boxShadow:
          'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
      }}
    >
      {(loading || submitting) && <Spinner />}
      {loading && !submitting ? (
        <Spinner />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              mb: '3rem',
            }}
          >
            <Typography variant="h4" component="h1">
              {` ${data?.title}'s Images`}
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                mb: '2rem',
                flexDirection: 'column',
              }}
            >
              <Typography variant="subtext">
                Upload Images to get started.
              </Typography>

              <TextField
                variant="outlined"
                sx={{ width: '80%', minWidth: '30vw' }}
                type="text"
                value={
                  form.images?.length === 0
                    ? ''
                    : form?.images.map((img) => img.name).join(', ')
                }
                InputProps={{
                  endAdornment: (
                    <IconButton component="label">
                      <FileUploadIcon />
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleChange}
                        name="images"
                      />
                    </IconButton>
                  ),
                }}
              />
            </Box>
            {data?.images.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="subtext">
                  Set a Featured Image or check the box on the picture to
                  delete.
                </Typography>
                <ImageList sx={{ width: 600 }} cols={3} rowHeight={300}>
                  {data?.images.map((img, i) => (
                    <ImageListItem
                      key={img.filename}
                      sx={{
                        '& button': {
                          position: 'absolute',
                          zIndex: 100,
                          right: 10,
                          top: 10,
                          width: '50px',
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
                      {featured.url !== img.url && (
                        <Button
                          variant="outlined"
                          onClick={() => setFeatured(img)}
                        >
                          Set Featured
                        </Button>
                      )}
                      {featured.url === img.url && (
                        <Button sx={{ color: 'white !important' }} disabled>
                          Featured
                        </Button>
                      )}
                      <img src={img.url} alt={img.filename} />

                      <ImageListItemBar
                        title={img.filename}
                        actionIcon={
                          <Checkbox
                            type="checkbox"
                            label="Delete"
                            id={`${i}-img`}
                            name="delete[]"
                            value={`${img.filename}`}
                            onChange={handleChange}
                            sx={{
                              '& .MuiSvgIcon-root': {
                                color: 'white',
                              },
                            }}
                          />
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                mt: 1,
              }}
            >
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
export default AgentBlogImage;
