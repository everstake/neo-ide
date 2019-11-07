import React , {useState, useEffect, withState} from "react";
import '../stylesheets/d.css';
import Afpp from '../App';
import SplitPane from 'react-split-pane';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import '../stylesheets/demos.css';
import ensureArray from 'ensure-array';
import ButtonM from './Button'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../stylesheets/react-breadcrumbs.css'
import styled from 'styled-components';
import Select from 'react-select'
import FileBrowserWrapper from '../containers/FileBrowserWrapper'
import MultilineTextFields from './ParametrsPane'
import Grid from '@material-ui/core/Grid';
import Wallet from './Wallet'
import { makeStyles } from '@material-ui/core/styles';
import LogPanel from '../containers/LogPanel'
import Paper from '@material-ui/core/Paper';
import * as actions from '../actions/index'
import { connect } from 'react-redux';

import SaveButton from './SaveButton'
import CompileButton from './CompileButton'
import DeployButton from './DeployButton'

import PanelsBlock from "./PanelsBlock";
import neoReducer from "../reducers/neo";

import Tab from './Tabs'
const Main = styled.main`
   
   
    margin-left: 20px;
    
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const mapStateToProps = store => ({
  logs: store,
  wallet: store.wallet,
  neo: store.neo,
});

const mapDispatchToProps = dispatch =>({
  addUserWallet: (a, b, c ,d)=>dispatch(actions.addUserWallet(a, b, c ,d)),
  addNeo: (a) => dispatch(actions.addNeo(a)),
});

const CCoptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
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
 
function HorizontalPanel(props) {
//   state = {
//     selected: 'home',
//     expanded: false,
//     account: '',
//     balance: null,
//     Neo: null,
//     Warning: null,
// };


const [selected, setSelected] = useState('home');
const [expanded, setExpanded] = useState(false);
const [account, setAccount] = useState('');
const [balance, setBalance] = useState(null);
const [Neo, setNeo] = useState(null);
const [Warning, setWarning] = useState(null);


  // const constructor(props) {
  //   super(props)
  // }

  useEffect(() => {
    
    // setNeo(1)
    // this.timerID = setInterval(() => {

if(!Neo){
window.addEventListener('neoline.ready', () => {

  const neoline =  new global.NEOLine.Init()
 
 setNeo(neoline)
//   // this.setState({
//   //     Neo: neoline,
//   // })

//   console.log(Neo)
  props.addNeo(neoline)

  neoline.getAccount()
  .then(account => {
  //   this.setState({
  //   account:account
  // }) 

  setAccount(account)
  test(neoline, account)
  console.log(account.address)
  })
  // this.test()\

});
// }

// return function cleanup(){
//   clearInterval(timerID);
// }
}
});

function test (a,b) {


  const timerID = setInterval(() => {
console.log(b.address)
a.getBalance({
        params: [
          {
            address: b.address,
            assets: ['NEO']
          },
        ],
        network: 'TestNet'
      })
      .then((results) => {
     
        let labal = null;
        Object.keys(results).forEach(address => {
          const balances = results[address];
          balances.forEach(balance => {
            const { assetID, symbol, amount } = balance
      
            
            // this.setState({
            //   balance:balance.amount,
            // })
           labal = balance.amount
            // console.log()
           return balance
          });
         
        });
        return labal}).then(  c => {
        // console.log(c)
        a.getNetworks()
.then(result => {
  

const {
  networks,
  defaultNetwork
} = result;
console.log("G1")
if(balance !== props.wallet.amount) {
console.log(c)
  props.addUserWallet(b.address, defaultNetwork, c, 'this')
}
})

      }).catch(e=>{     
                  console.log(e)});
      
    }, 3000);
  
}
  
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

 
const onSelect = (selected) => {
    // this.setState({ selected: selected });
    setSelected(selected)
};
const onToggle = (expanded) => {
    // this.setState({ expanded: expanded });
    setExpanded(expanded)
};


const f = () => {
  if(!Neo && !Warning){
    alert("no wallet") 
  this.setState({
    Warning: true
  })}
}
const onLoad = e => {
  console.log("LLLLLLOOOAD")
}

const walletclick =() =>{

  

}

const classes = useStyles();

function renderBreadcrumbs() {

  // console.log(useStyles[root]);
  
  
  const pageTitle = {
    'home': [<SaveButton />,
      <CompileButton />,
      <FileBrowserWrapper/>],
    'devices': [<div className='select'><Select options={CCoptions}></Select><ButtonM></ButtonM></div>],
    'reports': ['Reports'],
    'wallet' : [<Wallet account={account} balance={balance}></Wallet>, <MultilineTextFields></MultilineTextFields>],
    'settings/policies': ['Settings', 'Policies'],
    'settings/network': ['Settings', 'Network']
}; 
    // const { selected } = this.state;
    const list = ensureArray(pageTitle[selected]);

    return (
      <div className={classes.root}>
        
        {/* <Grid container wrap="nowrap" spacing={2}> */}
      
            {list.map((item, index) => (
               <Paper className={classes.paper}>
                <Grid xs={12} container wrap="nowrap" spacing={2}>
                   
                
                    {item}
                </Grid>
                </Paper>
            ))}
           
         {/* </Grid> */}
       
         </div>
    );
}

const navigate = (pathname) => () => {
    this.setState({ selected: pathname });
};



  // const { expanded, selected } = this.state;
    return (
      <div >
        <SplitPane split="vertical" size={550} >
          <div >
                <SideNav onSelect={onSelect} onToggle={onToggle}>
                    <SideNav.Nav selected={selected}>
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-folder-open" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                           
                        </NavItem>
                        <NavItem onClick={f}  eventKey="devices">
                            <NavIcon>
                                <i className="fa fa-fw fa-play-circle" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            
                        </NavItem>
                        <NavItem onClick={walletclick} eventKey="wallet">
                            <NavIcon>
                                <i className="fa fa-fw fa-bank" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Wallet">
                                Devices
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="reports">
                            <NavIcon>
                                <i className="fa fa-fw fa-bug" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Reports">
                                Reports
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Settings">
                                Settings
                            </NavText>
                            <NavItem eventKey="settings/policies">
                                <NavText title="Policies">
                                    Policies
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="settings/network">
                                <NavText title="Network">
                                    Network
                                </NavText>
                            </NavItem>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <Main className="main-breadcrumbs">
                    {renderBreadcrumbs()}
                </Main>
            </div>

          <SplitPane split="horizontal" size={500}>
            <Afpp />
            {/* <LogPanel /> */}
            <Tab/>
          </SplitPane>
        </SplitPane>
      </div>
    )
  }



export default connect(mapStateToProps, mapDispatchToProps)(HorizontalPanel);
