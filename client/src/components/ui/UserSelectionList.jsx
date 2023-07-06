import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function UserSelectionList({
  selectionList,
  defaultValue,
  cb,
  label,
  assignee,
  required,
  valueBy = 'email',
  sxStyles = { m: 1, width: '100%', mt: 1 },
}) {
  const [personName, setPersonName] = React.useState(defaultValue || '');

  const users = selectionList?.users || selectionList;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (cb) {
      const usr = users.filter((userL) => userL[valueBy] === value);
      cb(usr[0]);
    }
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={sxStyles}>
        <TextField
          required={required}
          select
          label={label}
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          defaultValue={defaultValue}
        >
          {users.map((name) => {
            if (assignee && name.role === 'user') return;

            return (
              <MenuItem key={name.id} name={name.id} value={name[valueBy]}>
                {name[valueBy]}
              </MenuItem>
            );
          })}
        </TextField>
      </FormControl>
    </div>
  );
}
