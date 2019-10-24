import React from 'react'

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../stylesheets/table.css'
import { connect} from 'react-redux';
import Select from 'react-select'
import PropTypes from 'prop-types'
import store from '../store'
import SplitButton from './SplitButton'
const useStyles = makeStyles(theme =>({
    root: {
      
    },
    paper: {
        
        width: '100%',
        overflowX: 'auto',
      position: '10px'
      },
    table: {
      minWidth: 650,
    },button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'center',
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  // const rows = [
  //   createData('NEO balance', 159, 6.0, 24, 4.0),
  //   createData('Gas', 237, 9.0, 37, 4.3),

  // ];

  const CCoptions = [
    { value: 'ocean', label: 'Odcean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];
class Wallet extends React.Component {

 
    state = {
        account: 'g',
        balance:'1001001001',
        // Neo: new global.NEOLine.Init(),
    }
hah (par ) {
    this.setState({
        account: "dfdfsds"
    })
}
constructor(props) {

    super(props)

  
}
fff() {
  console.log(store.getState())
}
componentWillMount() {  this.setState(prevState =>({
  balance: prevState.balance  = this.props.wallet.amount,
}))}
componentDidMount() {
  store.subscribe(this.fff)
  
//   this.timerID = setInterval(() => {
//      console.log(this.props.wallet.amount)
//   this.setState({
//       balance: this.props.wallet.amount,
//   })
// }, 100)
//       console.log(this.props.wallet
//         )
//     if (!this.state.Neo){ alert("dfdfsf")}else{
      
//         this.state.Neo.getAccount()
//         .then( account => {
         
//           this.setState({
//               account: account
//           })
        
//         })
// }
}
componentWillUnmount() {
  clearInterval(this.timerID);
}

    render() {
        const classes = useStyles;
        const rows = [
          createData('Address', this.props.wallet.address+''),
          createData('Gas',this.state.balance+''),
      
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
           < Select options={[{value: '1', label:this.props.wallet.coin_type[1]}, 
          {value:'2', label:this.props.wallet.coin_type[0]}]}></Select>
          
         <SplitButton/>
          </Paper>
          
         
          )
    }
    

}


const mapStateToProps = state => ({
  wallet: state.wallet[0]
}

);



export default connect(mapStateToProps)(Wallet);