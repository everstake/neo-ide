import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../stylesheets/table.css'

const useStyles = makeStyles({
    root: {
      
    },
    paper: {
        
        width: '100%',
        overflowX: 'auto',
      position: '10px'
      },
    table: {
      minWidth: 650,
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  // const rows = [
  //   createData('NEO balance', 159, 6.0, 24, 4.0),
  //   createData('Gas', 237, 9.0, 37, 4.3),

  // ];
export default class Wallet extends React.Component {

 
    state = {
        account: 'g',
        Neo: new global.NEOLine.Init(),
    }
hah (par ) {
    this.setState({
        account: "dfdfsds"
    })
}
constructor(props) {

    super(props)

  
}

componentDidMount() {
      
    if (!this.state.Neo){ alert("dfdfsf")}else{
      
        this.state.Neo.getAccount()
        .then( account => {
         
          this.setState({
              account: account
          })
        
        })
}
}
  
    render() {
        const classes = useStyles;
        const rows = [
          createData('Address', this.props.account.address+''),
          createData('Gas',this.props.balance+''),
      
        ];
        return(<Paper className="PaperClass">
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{this.props.account.label}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>)
    }
    

}