import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { TixHistoryContext } from '../../context/TixHistoryContext';

function TicketHistoryBarItem({ id }) {
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
    removeHistory(id);
  };
  useEffect(() => {
    return () => {
      clearTimeout(instance.current.timer);
    };
  }, []);

  return (
    <>
      <Link
        to={`/agent/dashboard/ticket/${id}`}
        style={{
          width: '70%',
          display: 'inline-block',
          marginLeft: '1.5rem',
        }}
      >
        <div>{id}</div>
      </Link>

      {showDelete ? (
        // trunk-ignore(eslint/jsx-a11y/no-static-element-interactions)
        // trunk-ignore(eslint/jsx-a11y/click-events-have-key-events)
        <div
          onClick={handleDelete}
          style={{
            backgroundColor: '#1976d2',
            display: 'flex',
            alignItems: 'center',
            width: '45%',
            height: '80%',
            color: 'white',
            padding: '.5rem',
          }}
        >
          <span style={{ fontSize: '.4rem' }}>Remove</span>
        </div>
      ) : (
        <div>
          <ClearIcon
            onClick={handleClick}
            sx={{ marginRight: 'auto', margin: '0 10px', color: 'white' }}
          />
        </div>
      )}
    </>
  );
}

export default TicketHistoryBarItem;
