import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
// import "../stylesheets/styles.css"
const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    fontSize: "8px !important",
  },
  table: {
    minWidth: 650,
    // fontSize: "8px",
    fontSize: "8px !important",
  },
});
function createData(name, calories) {
  return { name, calories };
}

// const rows = [
//   createData('Address', props.wallet.address+''),
//   createData('NEO',props.wallet.amount+''),
//   createData('CurrentNetwork', props.wallet.coin_type)

// ];

function Wallet(props) {
  const classes = useStyles();
  console.log(props.wallet.amount)

  const rows = [
    createData('Address', props.wallet.address+''),
    createData('NEO',props.wallet.amount+''),
    createData('CurrentNetwork', props.wallet.coin_type)
  
  ];
  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper}> */}
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell   >{props.account.label}</TableCell>
              <TableCell  align="right" ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell align="left" component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      {/* </Paper> */}
    </div>
  );
}


const mapStateToProps = state => ({
  wallet: state.wallet
}

);

export default connect(mapStateToProps)(Wallet)