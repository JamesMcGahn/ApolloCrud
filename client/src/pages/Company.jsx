import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import AgentLayout from '../components/layout/AgentLayout';
import getACompany from '../graphql/queries/getACompany';
import updateACompany from '../graphql/mutations/updateACompany';
import Spinner from '../components/ui/LoadingSpinner';
import TabPanel from '../components/navs/TabPanel';
import InfoDisplayTable from '../components/tables/InfoDisplayTable';
import CompanyForm from '../components/forms/CompanyForm';

function Company() {
  const { id } = useParams();
  const { data, loading } = useQuery(getACompany, {
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

  const rows = data?.company?.users
    ? data?.company?.users.map((user) => ({
        id: user.id,
        cell1: user.name,
        cell2: {
          link: true,
          display: user?.company?.name,
          path: `/agent/dashboard/companies/${user.company.id}`,
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
    <AgentLayout>
      {updateLoading || loading ? (
        <Spinner />
      ) : (
        <TabPanel
          tabHeaders={['Company Info', 'Users']}
          tabContent={[
            <CompanyForm
              handleSubmit={handleSubmit}
              company={updateData?.company || data?.company}
            />,
            <InfoDisplayTable
              rows={rows}
              heads={headCells}
              numCellPerRow={5}
              cellLink={`/agent/dashboard/companies/${id}/`}
            />,
          ]}
        />
      )}
    </AgentLayout>
  );
}
export default Company;
