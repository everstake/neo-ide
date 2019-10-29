import React from "react";
import '../stylesheets/d.css';
import Afpp from '../App';
import SplitPane from 'react-split-pane';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
// import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import FileBrowser, { FileRenderers, FolderRenderers, Groupers, Icons } from '../file_explorer'
// import FontAwesome from 'font-awesome'
import FontAwesomeIcons from "../file_explorer/icons/FontAwesome";
import '../stylesheets/demos.css';
import ensureArray from 'ensure-array';
import FileExplorer from '../components/FileExplorer'
import ButtonM from './Button'
import Paper from '@material-ui/core/Paper';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../stylesheets/react-breadcrumbs.css'
import styled from 'styled-components';
import Select from 'react-select'

import Wallet from './Wallet'

import LogPanel from '../containers/LogPanel'

import * as actions from '../actions/index'
import { connect } from 'react-redux';

import SaveButton from '../components/SaveButton'
import CompileButton from '../components/CompileButton'
import DeployButton from '../components/DeployButton'

import PanelsBlock from "./PanelsBlock";
import neoReducer from "../reducers/neo";


import Moment from 'moment'
import defaultFiles from '../default_files/default_files'

const Main = styled.main`
   
   
    margin-left: 20px;
    
`;

const mapStateToProps = store => ({
  files: store.files,
  logs: store,
  wallet: store.wallet,
  neo: store.neo,
});

const mapDispatchToProps = dispatch =>({
  addUserWallet: (a, b, c ,d)=>dispatch(actions.addUserWallet(a, b, c ,d)),
  addNeo: (a) => dispatch(actions.addNeo(a)),
  addFile: (file, lang) => dispatch(actions.addFile(file, lang)),
  changeCurrentFile: (name)=>dispatch(actions.changeCurrentFile(name)),
  renameFolder: (currentKey, newKey)=>dispatch(actions.renameFolder(currentKey, newKey)),
  renameFile: (currentKey, newKey)=>dispatch(actions.renameFile(currentKey, newKey))
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
 
class HorizontalPanel extends React.Component {
  state = {
    selected: 'home',
    expanded: false,
    account: '',
    balance: null,
   Neo: null,
    Warning: null,
};

  constructor(props) {
    super(props)
  }

  handleCreateFolder = (key) => {
    this.setState(state => {
      state.files = state.files.concat([{
        key: key,
      }])
      return state
    })
  }

  handleCreateFiles = (files, prefix) => {
    this.setState(state => {
      const newFiles = files.map((file) => {
        let newKey = prefix
        if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
          newKey += '/'
        }
        newKey += file.name
        return {
          key: newKey,
          size: file.size,
          modified: +Moment(),
        }
      })

      const uniqueNewFiles = []
      newFiles.map((newFile) => {
        let exists = false
        state.files.map((existingFile) => {
          if (existingFile.key === newFile.key) {
            exists = true
          }
        })
        if (!exists) {
          uniqueNewFiles.push(newFile)
        }
      })
      state.files = state.files.concat(uniqueNewFiles)
      return state
    })
  }

  handleRenameFolder = (oldKey, newKey) => {
    this.props.renameFolder(oldKey, newKey)
  }

  handleRenameFile = (oldKey, newKey) => {
    this.props.renameFile(oldKey, newKey)
    this.props.changeCurrentFile(newKey)
  }

  handleDeleteFolder = (folderKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key.substr(0, folderKey.length) !== folderKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }

  handleDeleteFile = (fileKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key !== fileKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }

  setDefaultFiles(){
    console.log("*********\n*********\n*********\n*********\n*********\n")

    defaultFiles.map((file, index) => {
      let lang = ''
      if (file.file) {
        lang = 'python'
        console.log("****: ", file.key.slice(-3))
        if (file.key.slice(-3) == '.cs')
          lang = 'csharp'
      }
      this.props.addFile(file, lang)
    })

    this.props.changeCurrentFile('domain.py');
  }

  componentDidMount(){

    this.setDefaultFiles()

    // this.timerID = setInterval(() => {

if(!this.state.Neo){console.log("not connectdHH")
window.addEventListener('neoline.ready', () => {
  console.log("CONNECTED");
  const neoline =  new global.NEOLine.Init()
  console.log(neoline)


  this.setState({
      Neo: neoline,
  })
  this.props.addNeo(neoline)
console.log(this.props)
  this.props.neo.neo.getAccount()
  .then(account => {
    this.setState({
    account:account
  }) 
  this.test( this.props.neo.neo)

  })
  // this.test()\

});
}
  }

test (a) {

  this.timerID = setInterval(() => {
const neoline = a
console.log(this.state.account.address)
console.log("G1")
this.props.neo.neo.getBalance({
        params: [
          {
            address: this.state.account.address,
            assets: ['NEO']
          },
        ],
        network: 'TestNet'
      })
      .then((results) => {
        console.log("G2")

        console.log(results)
        Object.keys(results).forEach(address => {
          const balances = results[address];
          balances.forEach(balance => {
            const { assetID, symbol, amount } = balance
      
            
            this.setState({
              balance:balance.amount,
            })

            console.log('dsfsadfdf')
           ;
          });
        });
      }).then( () => {
        console.log("G3")

          console.log('dsfsadfdf')
        this.props.neo.neo.getNetworks()
.then(result => {
  console.log("G4")

const {
  networks,
  defaultNetwork
} = result;

if(this.state.balance !== this.props.wallet.amount) {
  this.props.addUserWallet(this.state.account.address, defaultNetwork, this.state.balance, 'this')
}
})


      }).catch(e=>{console.log("G5");      
                  console.log(e)});
      
      
    }, 3000);
    console.log("G6")
}
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

 
onSelect = (selected) => {
    this.setState({ selected: selected });
};
onToggle = (expanded) => {
    this.setState({ expanded: expanded });
};


f = () => {
  if(!this.state.Neo && !this.state.Warning){
    alert("no wallet") 
  this.setState({
    Warning: true
  })}
}
onLoad = e => {
  console.log("LLLLLLOOOAD")
}

walletclick =() =>{

  

}
renderBreadcrumbs() {

  const pageTitle = {
    'home': [<SaveButton />,
      <CompileButton />,
    
      <FileBrowser
      icons={FontAwesomeIcons(4)}
      files={ this.props.files }
      openFolders = { {'examples_python/': true} }
      selection = {'examples_python/domain.py'}

      onCreateFolder={this.handleCreateFolder}
      // onCreateFiles={this.handleCreateFiles}
      // onMoveFolder={this.handleRenameFolder}
      // onMoveFile={this.handleRenameFile}
      onRenameFolder={this.handleRenameFolder}
      onRenameFile={this.handleRenameFile}
      // onDeleteFolder={this.handleDeleteFolder}
      // onDeleteFile={this.handleDeleteFile}
      
    />],
    'devices': [<div className='select'><Select options={CCoptions}></Select><ButtonM></ButtonM></div>],
    'reports': ['Reports'],
    'wallet' : [<Wallet account={this.state.account} balance={this.state.balance}></Wallet>],
    'settings/policies': ['Settings', 'Policies'],
    'settings/network': ['Settings', 'Network']
}; 
    const { selected } = this.state;
    const list = ensureArray(pageTitle[selected]);

    return (
        <Breadcrumbs >
            {list.map((item, index) => (
                <Breadcrumbs.Item
                    active={index === list.length - 1}
                    key={`${selected}_${index}`}
                >
                    {item}
                </Breadcrumbs.Item>
            ))}
        </Breadcrumbs>
    );
}

navigate = (pathname) => () => {
    this.setState({ selected: pathname });
};

render (){

  const { expanded, selected } = this.state;
    return (
      <div >
        <SplitPane split="vertical" size={550} >
          <div >
                <SideNav onSelect={this.onSelect} onToggle={this.onToggle}>
                    <SideNav.Nav selected={selected}>
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-folder-open" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                           
                        </NavItem>
                        <NavItem onClick={this.f}  eventKey="devices">
                            <NavIcon>
                                <i className="fa fa-fw fa-play-circle" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            
                        </NavItem>
                        <NavItem onClick={this.walletclick} eventKey="wallet">
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
                    {this.renderBreadcrumbs()}
                </Main>
            </div>

          <SplitPane split="horizontal" size={500}>
            <Afpp />
            <LogPanel />
          </SplitPane>
        </SplitPane>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalPanel);
