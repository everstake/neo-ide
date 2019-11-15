import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as actions from '../actions/index'
import {connect} from 'react-redux';
import notify from '../utils/notificator.js';

const diskButtons = function GroupedButtons(props) {

  const handleUploadFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var preview = document.getElementById('file');
        var file = document.querySelector('input[type=file]').files[0];
        console.log(document.querySelector('input[type=file]').files[0])
        var reader = new FileReader()

        var textFile = /text.*/;
        
        if (file.type.match(textFile)) {
           reader.onload = function (event) {
              console.log(event.target.result)
              props.addFile([{key: file.name, savedContent: event.target.result}], '')
           }
           reader.readAsText(file)
        } else {
            props.enqueueSnackbar(notify('It doesn\'t seem to be a text file!', 'error', 'File browser', props.closeSnackbar));
        }
    } else {
      props.enqueueSnackbar(notify('Your browser is too old to support HTML5 File API', props.closeSnackbar));
    }    
  }

  const handleDownloadFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

    } else {
      props.enqueueSnackbar(notify('Your browser is too old to support HTML5 File API', props.closeSnackbar));
    }    
  }
  
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={15}>
        <ButtonGroup variant="text" fullWidth aria-label="small contained button group">
          <Button
            variant="text"
            component="label"
          >
            Upload 
            <input
              onChange={handleUploadFile}
              type="file" 
              id="file" 
              name="file"
              multiple={false}
              style={{ display: "none" }}
            />
          </Button>
          <Button>Download</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = store => ({
  files: store.files,
});

const mapDispatchToProps = dispatch =>({
  enqueueSnackbar: (message, options)=>dispatch(actions.enqueueSnackbar(message, options)),
  addFile: (files, prefix) => dispatch(actions.addFile(files, prefix)),
  changeCurrentFile: (name)=>dispatch(actions.changeCurrentFile(name)),
  renameFolder: (currentKey, newKey, onError)=>dispatch(actions.renameFolder(currentKey, newKey, onError)),
  renameFile: (currentKey, newKey)=>dispatch(actions.renameFile(currentKey, newKey)),
  addFolder: (folderKey)=>dispatch(actions.addFolder(folderKey)),
  deleteFolder: (folderKey)=>dispatch(actions.deleteFolder(folderKey)),
  deleteFile: (fileKey)=>dispatch(actions.deleteFile(fileKey)),
  closeSnackbar: (key)=>dispatch(actions.closeSnackbar(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(diskButtons)