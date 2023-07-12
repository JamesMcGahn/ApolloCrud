import { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TicketTable from '../tables/TicketTable/TicketTable';
import { TixDashTabContext } from '../../context/TixDashTabsContext';
import BreadCrumbs from './BreadCrumbs';

function TabPanel({ children, value, index, ...other }) {
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TicketTabPanel({
  ticketData,
  handleDelete,
  agentTicketLink = '/agent/dashboard/ticket/',
  customer = false,
}) {
  const { tabStatuses, currentTab, setCurrentTab } =
    useContext(TixDashTabContext);

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setCurrentTab(index);
  };

  const ticketStatusData = () => {
    if (tabStatuses[currentTab] === 'All') {
      return ticketData;
    }

    if (ticketData?.length > 0) {
      return ticketData.filter((tix) => tix.status === tabStatuses[currentTab]);
    }
    return [];
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', minWidth: '60vw' }}>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              background: '#f9fcfd',
            },
          }}
        >
          {tabStatuses.map((tab, i) => (
            <Tab label={tab} {...a11yProps(i)} name={tab} key={tab} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currentTab}
        onChangeIndex={handleChangeIndex}
      >
        {tabStatuses.map((tabP, i) => (
          <TabPanel
            key={`${tabP}-display`}
            value={currentTab}
            index={i}
            dir={theme.direction}
          >
            <Box
              sx={{
                '& div:first-of-type': {
                  marginLeft: '0 !important',
                },
              }}
            >
              <BreadCrumbs />
            </Box>

            <TicketTable
              data={ticketStatusData}
              title={`${tabP} Tickets`}
              handleDelete={handleDelete}
              agentTicketLink={agentTicketLink}
              customer={customer}
            />
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
}

export default TicketTabPanel;
