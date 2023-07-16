import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import getAllCompanies from '../../../graphql/queries/getAllCompanies';
import InfoDisplayTable from '../../../components/tables/InfoDisplayTable';
import Spinner from '../../../components/ui/LoadingSpinner';
import PopModal from '../../../components/ui/PopModal';
import CompanyForm from '../../../components/forms/CompanyForm';
import createACompany from '../../../graphql/mutations/createACompany';

const Companies = () => {
  const { data, loading } = useQuery(getAllCompanies);
  const [modalOpen, setModalOpen] = useState(false);
  const [company, setCompany] = useState({
    name: '',
    level: '',
    notes: '',
  });

  const [createNewCompany] = useMutation(createACompany, {
    onCompleted: (udata) => {
      toast.success(`Company - ${udata.createCompany.name} Created`, {
        theme: 'colored',
      });
      setModalOpen(false);
      setCompany({
        name: '',
        level: '',
        notes: '',
      });
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
    refetchQueries: [{ query: getAllCompanies }],
  });

  const handleSubmit = (info) => {
    if (!info.name) {
      toast.error('Provide a Company Name.', {
        theme: 'colored',
      });
      return;
    }
    const cmpySubmit = {
      name: info.name,
      notes: info.notes,
      domain: info.domain === '' ? null : info.domain,
      level: info.level === '' ? undefined : info.level,
    };

    createNewCompany({ variables: { newCompany: cmpySubmit } });
  };

  const rows = data?.companies
    ? data.companies.map((cmpy) => ({
        id: cmpy.id,
        cell1: cmpy.name,
        cell2: cmpy.level,
        cell3: cmpy.id,
      }))
    : [];

  const headCells = [
    {
      id: 'cell1',
      numeric: false,
      disablePadding: false,
      label: 'Name',
    },
    {
      id: 'cell2',
      numeric: false,
      disablePadding: false,
      label: 'Level',
    },
    {
      id: 'cell3',
      numeric: false,
      disablePadding: false,
      label: 'Id',
    },
  ];

  return (
    <>
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
              justifyContent: 'space-between',
              width: '100%',
              mb: '1rem',
            }}
          >
            <Box>
              <Typography variant="h4" component="h1">
                Companies
              </Typography>
            </Box>
            <Box>
              <PopModal
                buttonText="Add Company"
                open={modalOpen}
                setOpen={setModalOpen}
                sx={{ width: '500px' }}
              >
                <CompanyForm
                  company={company}
                  createForm
                  handleSubmit={handleSubmit}
                />
              </PopModal>
            </Box>
          </Box>

          {loading ? (
            <Spinner />
          ) : (
            <InfoDisplayTable
              rows={rows}
              heads={headCells}
              numCellPerRow={3}
              cellLink="/agent/companies/"
            />
          )}
        </Card>
      </Container>
    </>
  );
};

export default Companies;
