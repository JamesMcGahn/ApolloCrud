import { useState } from 'react';
import { styled } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ margin: '3rem 0', minHeight: '40vh' }}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .indicatorSpan': {
    width: '100%',
    backgroundColor: '#fff',
  },
  '& .MuiButtonBase-root': {
    width: '22%',
    borderTop: '2px solid rgba(255, 255, 255, 0.3)',
    paddingLeft: '1px',
    alignItems: 'flex-start',
  },
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  '& .MuiTabs-indicator': {
    bottom: '46px',
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: '#fff',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.6)',
    '&.Mui-selected': {
      color: '#fff',
      fontWeight: 'bold',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  }),
);

function BottomTabPanel({ labels, tabs }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          color: 'white',
          '& .MuiTabPanel-root': {
            minHeight: '50vh',
            marginBottom: '1.5rem',
          },
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          {labels.map((label, i) => (
            <StyledTab label={label} value={i} key={label} />
          ))}
        </StyledTabs>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          {tabs.map((tab, i) => (
            <TabPanel index={i} key={`tab-${labels[i]}`} value={i}>
              {tab}
            </TabPanel>
          ))}
          <Box sx={{ p: 3 }} />
        </SwipeableViews>
      </Box>
    </Box>
  );
}

export default BottomTabPanel;
