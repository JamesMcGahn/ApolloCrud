import React, { useEffect, useRef, useContext } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import { TixHistoryContext } from '../../context/TixHistoryContext';
import loggedInUserQ from '../../graphql/queries/loggedInUser';
import LinkRouter from '../utils/LinkRouter';

function TicketHistoryBarItem({ id }) {
  const { data: userData } = useQuery(loggedInUserQ);
  const { removeHistory } = useContext(TixHistoryContext);
  const [showDelete, setShowDelete] = React.useState(false);
  const instance = useRef({ timer: 0 });

  const handleClick = (event) => {
    event.preventDefault();
    setShowDelete(true);
    instance.current.timer = setTimeout(() => {
      setShowDelete(false);
    }, 5000);
  };
  const handleDelete = (event) => {
    event.preventDefault();
    clearTimeout(instance.current.timer);
    removeHistory([id.ticket]);
  };
  useEffect(() => {
    return () => {
      clearTimeout(instance.current.timer);
    };
  }, []);

  return (
    <>
      <LinkRouter
        underline="none"
        to={id.path}
        sx={{
          width: '55%',
          display: 'inline-block',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            marginLeft: '.5rem',
          }}
        >
          {id.ticket}
        </Box>
      </LinkRouter>

      {showDelete ? (
        <Box
          onClick={handleDelete}
          sx={{
            backgroundColor: '#1976d2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            height: '100%',
            color: 'white',
          }}
        >
          <span style={{ fontSize: '.4rem' }}>Remove</span>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            width: '45%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ClearIcon
            onClick={handleClick}
            sx={{
              fontSize: '1rem',
              color: 'white',
              marginTop: '.1rem',
            }}
          />
        </Box>
      )}
    </>
  );
}

export default TicketHistoryBarItem;
