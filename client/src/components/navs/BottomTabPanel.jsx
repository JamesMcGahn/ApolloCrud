import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

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
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          color: 'white',
        }}
      >
        <TabContext value={value}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            {labels.map((label, i) => (
              <StyledTab label={label} value={`${i + 1}`} key={label} />
            ))}
          </StyledTabs>
          {tabs.map((tab, i) => (
            <TabPanel key={`tab-${labels[i]}`} value={`${i + 1}`}>
              {tab}
            </TabPanel>
          ))}
          <Box sx={{ p: 3 }} />
        </TabContext>
      </Box>
    </Box>
  );
}

export default BottomTabPanel;
