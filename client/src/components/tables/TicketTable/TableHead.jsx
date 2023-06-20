import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
// trunk-ignore(eslint/import/no-extraneous-dependencies)
import { visuallyHidden } from '@mui/utils';

function TicketTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'Ticket ID',
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: 'Title',
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: 'Created At',
    },
    {
      id: 'updatedAt',
      numeric: false,
      disablePadding: false,
      label: 'Updated At',
    },

    {
      id: 'requester',
      numeric: false,
      disablePadding: false,
      label: 'Requester',
    },

    {
      id: 'assignee',
      numeric: false,
      disablePadding: false,
      label: 'Assignee',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TicketTableHead;
