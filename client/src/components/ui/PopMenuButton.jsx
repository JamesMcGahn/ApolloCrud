import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Container from '@mui/material/Container';

const StyledMenu = styled((props) => (
  <Menu
    {...props}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 150,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function PopMenuButton({
  defaultSelection,
  menuOptions,
  handleSubmit,
}) {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const menuList = menuOptions || [
    'New',
    'Open',
    'Pending',
    'Blocked',
    'Closed',
  ];
  const [selected, setSelected] = useState(defaultSelection || menuList[0]);

  const handleClick = (event) => {
    if (event.target.id === 'arrow' || event.target.id === 'arrowC') {
      console.log(event.target.id);
      setAnchorEl(event.currentTarget);
    }
    if (event.target.name === selected) {
      handleSubmit(selected);
    }
  };
  const handleClose = (e) => {
    if (e.target.id) {
      setSelected(e.target.id);
    }

    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="pop-menu-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={
          <Container
            sx={{
              borderLeft: '1px solid white',
              padding: '1px 20px 1px 5px !important',
              marginLeft: '5px',
              height: '100%',
            }}
            id="arrowC"
          >
            <KeyboardArrowDownIcon
              id="arrow"
              sx={{ paddingLeft: '5px', marginLeft: '1px' }}
            />
          </Container>
        }
        sx={{ padding: '0 0  0 15px' }}
        name={selected}
      >
        {selected}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'pop-menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuList.map((menuItem) => (
          <MenuItem
            name={menuItem}
            onClick={handleClose}
            id={menuItem}
            disableRipple
            key={`${menuItem}-list`}
          >
            {menuItem}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}
