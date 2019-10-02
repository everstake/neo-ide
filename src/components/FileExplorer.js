
import React from 'react';
// import ReactDOM from 'react-dom';
// import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
// import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';
import * as GG from 'browserfs'


class FileExplorer extends React.Component {


  constructor(props) {

  super(props);
  // GG.install(window);
  // GG.configure({
  //   fs: "LocalStorage"
  // }, function(e) {
  //   if (e) {
  //     // An error happened!
  //     throw e;
  //   }
  //   // Otherwise, BrowserFS is ready-to-use!
  // });
  }


   componentDidMount(){
    GG.install(window);
    GG.configure({
      fs: "LocalStorage"
    }, function(e) {
      if (e) {
        // An error happened!
        throw e;
      }
      // Otherwise, BrowserFS is ready-to-use!
  
        GG.getFileSystem({
          fs: "LocalStorage"
        }, console.lo)
    });  
}
//  FileN.install(window);
render(){
  //let f = React.useRef.window

    // var apiOptions = {
    //     ...connectorNodeV1.apiOptions,
    //     apiRoot: `http://localhost:3020` // Or you local Server Node V1 installation.
      
    //   }
    return ( <div></div>)
} 
}

export default FileExplorer;