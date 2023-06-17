import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import loggedInUserQ from '../graphql/queries/loggedInUser';
import CustomerLayout from '../components/layout/CustomerLayout';
import TicketTable from '../components/TicketTable';
import getMyTickets from '../graphql/queries/getMyTickets';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function CustomerDashboard() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { status } = useParams();

  const { data: currU } = useQuery(loggedInUserQ);

  const statusParam = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : null;

  const { loading, error, data } = useQuery(getMyTickets, {
    variables: {
      userId: currU?.currentUser.id,
      status: [statusParam],
    },
  });
  const [getMyStatusTix, { loading: lzLoading, error: lzError, data: lzData }] =
    useLazyQuery(getMyTickets);

  const handleQuery = (status) => {
    getMyStatusTix({
      variables: {
        userId: currU?.currentUser.id,
        status: [status],
      },
    });
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    if (event.target.name !== 'all') {
      handleQuery(event.target.name);
    }

    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const statuses = ['New', 'Open', 'Pending', 'Blocked', 'Closed'];

  return (
    <CustomerLayout>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Box sx={{ bgcolor: 'background.paper', minWidth: '80vw' }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="All" {...a11yProps(0)} name="all" />
              {statuses.map((tab, i) => (
                <Tab
                  label={tab}
                  {...a11yProps(i + 1)}
                  name={tab}
                  key={`${tab}-tab`}
                />
              ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {loading ? 'loading' : <TicketTable data={data?.myTickets} />}
            </TabPanel>
            {statuses.map((tabP, i) => (
              <TabPanel
                key={`${tabP}-tab-pabel`}
                value={value}
                index={i + 1}
                dir={theme.direction}
              >
                {lzLoading ? (
                  'loading'
                ) : (
                  <TicketTable data={lzData?.myTickets} />
                )}
              </TabPanel>
            ))}
          </SwipeableViews>
        </Box>
      </Container>
    </CustomerLayout>
  );
}

export default CustomerDashboard;
