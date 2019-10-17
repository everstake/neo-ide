import React from "react";
import '../stylesheets/d.css';
import Afpp from '../App';
import SplitPane from 'react-split-pane';

import Moment from 'moment'
import FileBrowser, { FileRenderers, FolderRenderers, Groupers, Icons } from '../file_explorer'
// import FontAwesome from 'font-awesome'
import FontAwesomeIcons from "../file_explorer/icons/FontAwesome";
import '../stylesheets/demos.css';

import FileExplorer from '../components/FileExplorer'
import LogPanel from '../components/LogPanel'

class HorizontalPanel extends React.Component
{

constructor(props){
    console.log(FontAwesomeIcons(4))
    super(props)
}

render (){
    return (
       <div>
           
        <SplitPane split="vertical" size={300} >
        
        <FileBrowser
      icons={FontAwesomeIcons(4)}
      files={[
        {
          key: 'new-folder/',
          modified: +Moment().subtract(1, 'hours'),
          size: 0,
        },
        {
          key: 'new-folder/cat.js',
         modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
        },
      ]}
      
    />

      
        <SplitPane split="horizontal"  size={800}>
             <Afpp/>
             <LogPanel  />
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
