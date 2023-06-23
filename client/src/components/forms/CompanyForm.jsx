import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import { green, blue, orange, purple } from '@mui/material/colors';
import UserSelectionList from '../ui/UserSelectionList';

function CompanyForm({ handleSubmit, company }) {
  const [companyInfo, setCompanyInfo] = useState(company);
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

  return (
    <Container sx={{ pt: '2rem', display: 'flex', justifyContent: 'center' }}>
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
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
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
          <Box sx={{ width: '75%', padding: '2rem 1rem 0rem 0' }}>
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
          <Box sx={{ width: '25%', padding: '1rem' }} />
          <Box sx={{ width: '75%', padding: '.5rem 1rem 1rem 0' }}>
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
          }}
        >
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Update
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
export default CompanyForm;
