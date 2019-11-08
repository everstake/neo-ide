import React from "react";
import FileBrowser from '../file_explorer'
import FontAwesomeIcons from "../file_explorer/icons/FontAwesome";
import * as actions from '../actions/index'
import {connect} from 'react-redux';
import defaultFiles from '../default_files/default_files'


class FileBrowserWrapper extends React.Component {

    handleCreateFolder = (key) => {
        this.props.addFolder(key)
    };

    handleCreateFiles = (files, prefix) => {
        this.props.addFile(files, prefix)
    };

    handleRenameFolder = (oldKey, newKey) => {
        console.log("Func: ", this.props.enqueueSnackbar)
        this.props.renameFolder(oldKey, newKey, this.props.enqueueSnackbar.bind(this))
    }
    
    handleRenameFile = (oldKey, newKey) => {
        this.props.renameFile(oldKey, newKey);
        this.props.changeCurrentFile(newKey)
    };

    handleDeleteFolder = (folderKey) => {
        this.props.deleteFolder(folderKey)
    };

    handleDeleteFile = (fileKey) => {
        this.props.deleteFile(fileKey)
    };

    setDefaultFiles() {
        defaultFiles.folders.map(elem => {
            this.props.addFolder(elem.key);
        });

        this.props.addFile(defaultFiles.files, '');
        this.props.changeCurrentFile('domain.py');
    }

    componentDidMount() {
        if (this.props.files.length == 0) {
            this.setDefaultFiles()
        }
    }

    render() {
        return (
            <FileBrowser
                icons={FontAwesomeIcons(4)}
                files={this.props.files}
                openFolders={{'examples_python/': true}}
                selection={'examples_python/domain.py'}

                headerRenderer={false}

                // onDownloadFile = { (hi) => console.log(hi)}

                onCreateFolder={this.handleCreateFolder}

                onCreateFiles={this.handleCreateFiles}

                onMoveFolder={this.handleRenameFolder}
                onMoveFile={this.handleRenameFile}

                onRenameFolder={this.handleRenameFolder}
                onRenameFile={this.handleRenameFile}

                onDeleteFolder={this.handleDeleteFolder}
                onDeleteFile={this.handleDeleteFile}
            />
        )
    }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowserWrapper)