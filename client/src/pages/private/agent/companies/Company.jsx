import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import getACompany from '../../../../graphql/queries/getACompany';
import updateACompany from '../../../../graphql/mutations/updateACompany';
import deleteACompany from '../../../../graphql/mutations/deleteACompany';
import Spinner from '../../../../components/ui/LoadingSpinner';
import TabPanel from '../../../../components/navs/TabPanel';
import InfoDisplayTable from '../../../../components/tables/InfoDisplayTable';
import TicketTable from '../../../../components/tables/TicketTable/TicketTable';
import CompanyForm from '../../../../components/forms/CompanyForm';
import getTickets from '../../../../graphql/queries/getTickets';
import getAllUsers from '../../../../graphql/queries/getAllUser';
import getAllCompanies from '../../../../graphql/queries/getAllCompanies';

function Company() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(getACompany, {
    variables: { companyId: id },
    onError: (error) => {
      if (error?.graphQLErrors) {
        if (error?.graphQLErrors[0]?.extensions.code === 'CASTE_ERROR') {
          navigate('/404', {
            state: {
              title: 'We Cannot Find That Company.',
              message: `We cannot find the Company with the ID of ${id}. Please make sure you have the right link.`,
            },
          });
          return;
        }
      }

      toast.error(error.message, {
        theme: 'colored',
      });
    },
  });

  const { data: ticketData, loading: ticketLoading } = useQuery(getTickets, {
    variables: { companyId: id },
  });

  const [updateCompany, { loading: updateLoading, data: updateData }] =
    useMutation(updateACompany, {
      onCompleted: (udata) => {
        toast.success(`Company ${udata.updateCompany.name} Updated`, {
          theme: 'colored',
        });
      },
      onError(err) {
        toast.error(err.message, {
          theme: 'colored',
        });
      },
    });

  const [deleteCompany] = useMutation(deleteACompany, {
    onCompleted: () => {
      toast.success(`Company ${data.company.name} Deleted`, {
        theme: 'colored',
      });
      navigate('/agent/companies');
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
    refetchQueries: [{ query: getAllUsers }],
    update(cache) {
      const { companies } = cache.readQuery({ query: getAllCompanies });
      cache.writeQuery({
        query: getAllCompanies,
        data: { companies: companies.filter((cmp) => cmp.id !== id) },
      });
    },
  });

  const handleSubmit = (company) => {
    const companyChange = {
      name: company?.name,
      domain: company?.domain,
      email: company?.email,
      notes: company?.notes,
      level: company?.level,
    };
    updateCompany({
      variables: { updateCompanyId: company.id, updateCompany: companyChange },
    });
  };

  const handleDelete = () => {
    deleteCompany({ variables: { deleteCompanyId: id } });
  };

  const rows = data?.company?.users
    ? data?.company?.users.map((user) => ({
        id: user.id,
        cell1: user.name,
        cell2: {
          link: true,
          display: user?.company?.name,
          path: `/agent/companies/${user?.company?.id}`,
        },
        cell3: user.role,
        cell4: user.email,
        cell5: user.isActive ? 'Active' : 'Disabled',
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
      label: 'Company',
    },
    {
      id: 'cell3',
      numeric: false,
      disablePadding: false,
      label: 'Role',
    },
    {
      id: 'cell4',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'cell5',
      numeric: false,
      disablePadding: false,
      label: 'Active:',
    },
  ];

  return (
    <>
      {updateLoading || loading ? (
        <Spinner />
      ) : (
        <TabPanel
          tabHeaders={['Company Info', 'Users', 'Tickets']}
          tabContent={[
            <CompanyForm
              handleSubmit={handleSubmit}
              company={updateData?.company || data?.company}
              handleDelete={handleDelete}
            />,
            <InfoDisplayTable
              rows={rows}
              heads={headCells}
              numCellPerRow={5}
              cellLink={`/agent/companies/${id}/`}
            />,
            ticketLoading ? (
              <Spinner />
            ) : (
              <TicketTable data={ticketData?.tickets} />
            ),
          ]}
        />
      )}
    </>
  );
}
export default Company;
