import React from "react";
import '../stylesheets/d.css';
import Afpp from '../App';
import SplitPane from 'react-split-pane';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import Moment from 'moment'
import FileBrowser, { FileRenderers, FolderRenderers, Groupers, Icons } from '../file_explorer'
// import FontAwesome from 'font-awesome'
import FontAwesomeIcons from "../file_explorer/icons/FontAwesome";
import '../stylesheets/demos.css';
import ensureArray from 'ensure-array';
import FileExplorer from '../components/FileExplorer'
import LogPanel from '../components/LogPanel'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../stylesheets/react-breadcrumbs.css'
import styled from 'styled-components';
import Select from 'react-select'
const Main = styled.main`
   
   
    margin-left: 70px;
    
`;


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

  constructor(props) {
    console.log(FontAwesomeIcons(4))
    super(props)
  }
  state = {
    selected: 'home',
    expanded: false
};

onSelect = (selected) => {
    this.setState({ selected: selected });
};
onToggle = (expanded) => {
    this.setState({ expanded: expanded });
};

pageTitle = {
    'home': [<FileBrowser
      icons={FontAwesomeIcons(4)}
      files={[
        {
          key: 'test_folder/',
          modified: +Moment().subtract(1, 'hours'),
          size: 0,
        },
        {
          key: 'C#_contracts/contract.cs',
         modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 245 * 1024,
        },
        {
          key: 'Python_contracts/contract.py',
         modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 102 * 1024,
        },
      ]}
      
    />],
    'devices': [<div><Select  options={CCoptions}></Select></div>],
    'reports': ['Reports'],
    'settings/policies': ['Settings', 'Policies'],
    'settings/network': ['Settings', 'Network']
};

renderBreadcrumbs() {
    const { selected } = this.state;
    const list = ensureArray(this.pageTitle[selected]);

    return (
        <Breadcrumbs>
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
  render() {

    const { expanded, selected } = this.state;
    return (
      <div>

        <SplitPane split="vertical" size={350} >

          {/* <FileBrowser
      icons={FontAwesomeIcons(4)}
      files={[
        {
          key: 'test_folder/',
          modified: +Moment().subtract(1, 'hours'),
          size: 0,
        },
        {
          key: 'C#_contracts/contract.cs',
         modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 245 * 1024,
        },
        {
          key: 'Python_contracts/contract.py',
         modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 102 * 1024,
        },
      ]}
      
    />
     */}
          <div>
                <div
                   
                >
                    
                </div>
                <SideNav onSelect={this.onSelect} onToggle={this.onToggle}>
                    
                    <SideNav.Nav selected={selected}>
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-folder-open" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                           
                        </NavItem>
                        <NavItem eventKey="devices">
                            <NavIcon>
                                <i className="fa fa-fw fa-play-circle" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            
                        </NavItem>
                        <NavItem eventKey="wallet">
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
                <Main expanded={expanded}>
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

export default HorizontalPanel;
// const splitPaneContext = React.createContext();

// export default function SplitPane({ children, ...props }) {
//     const [topHeight, setTopHeight] = React.useState(null);
//     const separatorYPosition = React.useRef(null);

//     const splitPaneRef = React.createRef();
//     console.log(splitPaneRef);
//     const onMouseDown = e => {
//         separatorYPosition.current = e.clientY;
//     };

//     const onMouseMove = e => {
//         if (!separatorYPosition.current) {
//             return;
//         }

//         const newTopHeight = topHeight + e.clientY - separatorYPosition.current;
//         separatorYPosition.current = e.clientY;

//         // if (newTopHeight <= 0) {
//         //   return topHeight !== 0 && setTopHeight(0);
//         // }

//         console.log(splitPaneRef.current.clientHeight);
//         const splitPaneHeight = splitPaneRef.current.clientHeight;

//         // if (newTopHeight >= splitPaneHeight) {
//         //   return topHeight !== splitPaneHeight && setTopHeight(splitPaneHeight);
//         // }

//         setTopHeight(newTopHeight);
//     };

//     const onMouseUp = () => {
//         separatorYPosition.current = null;
//     };

//     React.useEffect(() => {
//         document.addEventListener("mousemove", onMouseMove);
//         document.addEventListener("mouseup", onMouseUp);

//         return () => {
//             document.removeEventListener("mousemove", onMouseMove);
//             document.removeEventListener("mouseup", onMouseUp);
//         };
//     });

//     return (
//         <div {...props} className="split-pane" ref={this.splitPaneRef}>
//             <splitPaneContext.Provider value={{ topHeight, setTopHeight }}>
//                 {children[0]}
//                 <div className="separator" onMouseDown={onMouseDown} />
//                 {children[1]}
//             </splitPaneContext.Provider>
//         </div>
//     );
// }

// SplitPane.Top = function SplitPaneTop(props) {
//     const topRef = React.createRef();
//     const { topHeight, setTopHeight } = React.useContext(splitPaneContext);

//     React.useEffect(() => {
//         if (!topHeight) {
//             setTopHeight(topRef.current.clientHeight);
//             topRef.current.style.flex = "none";
//             return;
//         }

//         topRef.current.style.height = `${topHeight}px`;
//     }, [topHeight]);

//     return <div {...props} className="split-pane-top" ref={topRef} />;
// };

// SplitPane.Bottom = function SplitPaneBottom(props) {
//     return <div {...props} className="split-pane-bottom" />;
// };
