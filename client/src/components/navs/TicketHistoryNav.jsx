import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TicketHistoryBarItem from './TicketHistoryBarItem';
import { TixHistoryContext } from '../../context/TixHistoryContext';

export default function HistoryBar() {
  const { ticketHistory } = useContext(TixHistoryContext);

  const firstSix = ticketHistory;

  return (
    <div>
      <AppBar position="static">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          aria-label="Location History"
          value={false}
          variant="scrollable"
        >
          {firstSix.map((loc, i) => {
            return (
              <Tab
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRight: '1px solid',
                  padding: 0,
                  width: '5 rem',
                  borderRightColor: '#FFF',
                  '& a': {
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'none',
                  },
                }}
                label={<TicketHistoryBarItem id={loc} />}
                index={i}
                id={loc}
                key={loc}
              />
            );
          })}
        </Tabs>
      </AppBar>
    </div>
  );
}
