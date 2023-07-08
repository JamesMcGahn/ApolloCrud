import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import mergeTwoTickets from '../../graphql/mutations/mergeTickets';

function MergeTickets({ tickets, ticket, closeModal }) {
  const navigate = useNavigate();
  const [mergeTickets, setMergeTickets] = useState({
    mergeTicket: '',
    ticket: '',
  });

  const [mTixs] = useMutation(mergeTwoTickets, {
    variables: { ...mergeTickets },
    onCompleted: () => {
      closeModal(false);
      toast.success(
        `Ticket ${mergeTickets.mergeTicket} merged into ${mergeTickets.ticket}`,
      );

      closeModal(false);
      navigate(`/agent/dashboard/ticket/${mergeTickets.ticket}`);
      setMergeTickets({
        ticket: '',
        mergeTicket: '',
      });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (
      tickets &&
      mergeTickets.ticket === '' &&
      mergeTickets.mergeTicket === ''
    ) {
      setMergeTickets({
        mergeTicket: tickets[0],
        ticket: tickets[1],
      });
    }

    if (ticket && mergeTickets.ticket === '') {
      setMergeTickets({
        mergeTicket: ticket,
        ticket: '',
      });
    }
  }, []);

  const handleOnChange = (e) => {
    setMergeTickets((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMergeClick = () => {
    if (mergeTickets.ticket === '' || mergeTickets.mergeTicket === '') {
      toast.error('Please provide two tickets.');
      return;
    }
    mTixs();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h6">Merge</Typography>
      </Box>
      <Box>
        <TextField
          label="Ticket:"
          name="mergeTicket"
          value={mergeTickets.mergeTicket}
          onChange={handleOnChange}
        />
      </Box>
      <Box>
        <Typography variant="h6">Into</Typography>
      </Box>
      <Box>
        <TextField
          label="Ticket:"
          name="ticket"
          value={mergeTickets.ticket}
          onChange={handleOnChange}
        />
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleMergeClick}>
          Merge
        </Button>
      </Box>
    </Box>
  );
}
export default MergeTickets;
