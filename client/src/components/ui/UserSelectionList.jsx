import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

function getStyles(theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular,
  };
}

export default function UserSelectionList({
  selectionList,
  defaultValue,
  cb,
  label,
  assignee,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(defaultValue || '');

  const { users } = selectionList;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (cb) {
      const usr = users.filter((userL) => userL.email === value);
      cb(usr[0]);
    }
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '300px', mt: 3 }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            return selected;
          }}
          MenuProps={MenuProps}
          defaultValue={defaultValue}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {users.map((name) => {
            if (assignee && name.role === 'user') return;

            return (
              <MenuItem
                key={name.id}
                name={name.id}
                value={name.email}
                style={getStyles(theme)}
              >
                {name.email}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{label}</FormHelperText>
      </FormControl>
    </div>
  );
}
