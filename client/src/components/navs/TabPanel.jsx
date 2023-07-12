import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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

function TicketTabPanel({ breadCrumbs, tabHeaders, tabContent, sxStyles }) {
  const [tabIndex, setTabIndex] = useState(0);

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', ...sxStyles }}>
      <AppBar position="static">
        <Tabs
          value={tabIndex}
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
          {tabHeaders.map((tab, i) => (
            <Tab label={tab} {...a11yProps(i)} name={tab} key={tab} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {tabContent.map((tabC, i) => (
          <TabPanel
            // trunk-ignore(eslint/react/no-array-index-key)
            key={`${i}-display`}
            value={tabIndex}
            index={i}
            dir={theme.direction}
          >
            {breadCrumbs && (
              <Box
                sx={{
                  '& div:first-of-type': {
                    marginLeft: '0 !important',
                  },
                }}
              >
                <BreadCrumbs />
              </Box>
            )}
            {tabC}
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
}

export default TicketTabPanel;
