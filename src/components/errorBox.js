// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import Button from '@material-ui/core/Button';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import ErrorIcon from '@material-ui/icons/Error';
// import InfoIcon from '@material-ui/icons/Info';
// import CloseIcon from '@material-ui/icons/Close';
// import { amber, green } from '@material-ui/core/colors';
// import IconButton from '@material-ui/core/IconButton';
// import Snackbar from '@material-ui/core/Snackbar';
// import SnackbarContent from '@material-ui/core/SnackbarContent';
// import WarningIcon from '@material-ui/icons/Warning';
// import { makeStyles } from '@material-ui/core/styles';
// import { SnackbarProvider, useSnackbar } from 'notistack';



// const variantIcon = {
//   success: CheckCircleIcon,
//   warning: WarningIcon,
//   error: ErrorIcon,
//   info: InfoIcon,
// };

// const useStyles1 = makeStyles(theme => ({
//   success: {
//     backgroundColor: green[600],
//   },
//   error: {
//     backgroundColor: theme.palette.error.dark,
//   },
//   info: {
//     backgroundColor: theme.palette.primary.main,
//   },
//   warning: {
//     backgroundColor: amber[700],
//   },
//   icon: {
//     fontSize: 20,
//   },
//   iconVariant: {
//     opacity: 0.9,
//     marginRight: theme.spacing(1),
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// }));

// // function MySnackbarContentWrapper(props) {
// //   const classes = useStyles1();
// //   const { className, message, onClose, variant, ...other } = props;
// //   const Icon = variantIcon[variant];

// //   return (
// //     <SnackbarContent
// //       className={clsx(classes[variant], className)}
// //       aria-describedby="client-snackbar"
// //       message={
// //         <span id="client-snackbar" className={classes.message}>
// //           <Icon className={clsx(classes.icon, classes.iconVariant)} />
// //           {message}
// //         </span>
// //       }
// //       action={[
// //         <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
// //           <CloseIcon className={classes.icon} />
// //         </IconButton>,
// //       ]}
// //       {...other}
// //     />
// //   );
// // }

// // MySnackbarContentWrapper.propTypes = {
// //   className: PropTypes.string,
// //   message: PropTypes.string,
// //   onClose: PropTypes.func,
// //   variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
// // };

// // const useStyles2 = makeStyles(theme => ({
// //   margin: {
// //     margin: theme.spacing(1),
// //   },
// // }));

// // function CustomizedSnackbars() {
// //   const classes = useStyles2();
// //   const [open, setOpen] = React.useState(false);

// //   const onAlert = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = (event, reason) => {
// //     if (reason === 'clickaway') {
// //       return;
// //     }

// //     setOpen(false);
// //   };

// //   return (
// //     <div>
// //        <Button variant="outlined" className={classes.margin} onClick={onAlert}>
// //         Open success snackbar
// //       </Button>
// //       <Snackbar
// //         anchorOrigin={{
// //           vertical: 'bottom',
// //           horizontal: 'right',
// //         }}
// //         open={open}
// //         autoHideDuration={6000}
// //         onClose={handleClose}
// //       >
// //         <MySnackbarContentWrapper
// //           onClose={handleClose}
// //           variant="success"
// //           message="This is a success message!"
// //         />
// //       </Snackbar>
// //       {/* <MySnackbarContentWrapper
// //         variant="error"
// //         className={classes.margin}
// //         message="This is an error message!"
// //       />
// //       <MySnackbarContentWrapper
// //         variant="warning"
// //         className={classes.margin}
// //         message="This is a warning message!"
// //       />
// //       <MySnackbarContentWrapper
// //         variant="info"
// //         className={classes.margin}
// //         message="This is an information message!"
// //       />
// //       <MySnackbarContentWrapper
// //         variant="success"
// //         className={classes.margin}
// //         message="This is a success message!"
// //       /> */}

// //     </div>
// //   );
// // }


// let alertPreset = {
  
// }

// function Alerts() {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const [open, setOpen] = React.useState(false);

//   const onClose = (id, key) => {
//     return (
//       <div style={{ cursor: "pointer" }} onClick={() => closeSnackbar(key)}>
//         <span>❌</span>
//       </div>
//     );
//   };

//   const handleClick = () => {
//     enqueueSnackbar('Suction!');
//   };

//   // variant could be success, error, warning, info, or default
//   const handleClickVariant = variant => () => {
//     let autoHideDuration = 5000;
//     const snack = enqueueSnackbar(
//       'This is a success message!', {
//         variant, autoHideDuration, action: (id) => onClose(id, snack),
//       },
//     );
//   };

//   return (
//     <React.Fragment style={{ userSelect: false }}>
//       <Button onClick={handleClick}>Show snackbar</Button>
//       <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
//     </React.Fragment>
//   );
// }



// function IntegrationNotistack(props) {
//   return (
//     <SnackbarProvider maxSnack={9999999999}>
//       <Alerts props={props} />
//     </SnackbarProvider>
//   );
// }


// const mapStateToProps =  (store) => {
//   return {alerts: store.alerts};
// };

// const mapDispatchToProps = dispatch =>({
//   changeFileDeployed: (name)=>dispatch(actions.changeFileDeployed(name))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(IntegrationNotistack)


import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '../actions/index';

class Notifier extends Component {
    displayed = [];

    storeDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    };


    removeDisplayed = (id) => {
        this.displayed = this.displayed.filter(key => id !== key)
    }

    componentDidUpdate() {
        const { notifications = [] } = this.props;

        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                this.props.closeSnackbar(key)
                return
            }
            // Do nothing if snackbar is already displayed
            if (this.displayed.includes(key)) return;
            // Display snackbar using notistack
            this.props.enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }
                },
                onExited: (event, key) => {
                    this.props.removeSnackbar(key);
                    this.removeDisplayed(key)
                }
            });
            // Keep track of snackbars that we've displayed
            this.storeDisplayed(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = store => ({
    notifications: store.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifier));
