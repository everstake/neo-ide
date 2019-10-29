import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { connect } from 'react-redux';
import * as actions from '../actions/index'
const mapStateToProps = store => ({
  logs: store,
  wallet: store.wallet,
  neo: store.neo,
});
const options = ['Deploy'];
const mapDispatchToProps = dispatch =>({
  addLog: (a, b)=>dispatch(actions.addLog(a, b))
});
function SplitButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    // alert(`You clicked ${options[selectedIndex]}`);
    console.log(props.wallet)
    props.neo.neo.deploy({
      network: 'TestNet',
      name: 'Hello world!',
      version: 'v1.0.0',
      author: 'NEOLine',
      email: 'info@neoline.network',
      description: 'My first contract.',
      needsStorage: true,
      dynamicInvoke: false,
      isPayable: false,
      parameterList: '0710',
      returnType: '05',
      code: '53c56b0d57616b652075702c204e454f21680f4e656f2e52756e74696d652e4c6f6761006c7566',
      networkFee: '0.001'
    })
    .then(({txid, nodeUrl}: InvokeOutput) => {
      props.addLog(`Deploy transaction success!\nTransaction ID: ${txid} `, 'Deploy');
     
  
    })
    
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            color="primary"
            size="small"
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitButton);