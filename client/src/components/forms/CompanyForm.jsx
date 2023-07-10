import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { green, blue, orange, purple } from '@mui/material/colors';
import UserSelectionList from '../ui/UserSelectionList';

function CompanyForm({
  handleSubmit,
  company,
  createForm = false,
  handleDelete,
}) {
  const [companyInfo, setCompanyInfo] = useState(company);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    if (handleDelete) {
      handleDelete(companyInfo.id);
    }
  };

  const handleChange = (e) => {
    setCompanyInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRole = (level) => {
    setCompanyInfo((prev) => ({ ...prev, level: level.name }));
  };

  const onSubmit = () => {
    handleSubmit(companyInfo);
  };

  const levels = ['Small', 'Medium', 'Large', 'Enterprise'].map((n) => ({
    id: n,
    name: n,
  }));

  const companyColor = {
    Small: green[500],
    Medium: blue[500],
    Large: orange[500],
    Enterprise: purple[500],
  };

  const cardContents = (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {!createForm && (
          <Box
            sx={{
              width: '25%',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                bgcolor: companyColor[`${companyInfo?.level || 'Small'}`],
                width: 85,
                height: 85,
              }}
              aria-label="avatar"
            >
              {`${company.name[0].toUpperCase()}${
                company.name?.split(' ')[1]
                  ? company.name?.split(' ')[1][0]
                  : ''
              }`}
            </Avatar>
          </Box>
        )}
        <Box
          sx={
            createForm
              ? { width: '100%', minWidth: '300px' }
              : { width: '75%', padding: '2rem 1rem 0rem 0' }
          }
        >
          <FormControl fullWidth>
            <TextField
              id="company-name"
              label="Name:"
              name="name"
              value={companyInfo?.name}
              onChange={handleChange}
              sx={{ mb: '1rem' }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="company-domain"
              label="Domain:"
              name="domain"
              value={companyInfo?.domain || ''}
              onChange={handleChange}
              sx={{ mb: '1rem' }}
            />
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Box
          sx={createForm ? { width: '0' } : { width: '25%', padding: '1rem' }}
        />
        <Box
          sx={
            createForm
              ? { width: '100%', minWidth: '300px' }
              : { width: '75%', padding: '.5rem 1rem 1rem 0' }
          }
        >
          <FormControl fullWidth>
            <TextField
              id="user-notes"
              label="Notes:"
              name="notes"
              onChange={handleChange}
              multiline
              rows={4}
              defaultValue={companyInfo.notes}
            />
          </FormControl>
          <Box sx={{ pt: '1rem' }}>
            <InputLabel
              htmlFor="Selection-List"
              sx={{ fontSize: '.7rem', pl: '.8rem' }}
            >
              Company:
            </InputLabel>
            <UserSelectionList
              selectionList={levels}
              defaultValue={companyInfo.level}
              valueBy="name"
              sxStyles={{ width: '100%', mb: '1rem' }}
              cb={handleRole}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          width: '100%',
          pr: '2rem',
          minWidth: '300px',
        }}
      >
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {createForm ? 'Create' : 'Update'}
        </Button>
      </Box>
    </>
  );

  return (
    <Container sx={{ pt: '2rem', display: 'flex', justifyContent: 'center' }}>
      {!createForm && (
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minWidth: '40vw',
            minHeight: '60vh',
            padding: '1.5rem',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
          </Box>
          {cardContents}
        </Card>
      )}
      {createForm && <Container>{cardContents}</Container>}
    </Container>
  );
}
export default CompanyForm;
