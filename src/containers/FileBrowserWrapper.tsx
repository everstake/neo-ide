import React from "react";
import FileBrowser from "../file_explorer";
import FontAwesomeIcons from "../file_explorer/icons/FontAwesome";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import notify from "../utils/notificator";
import defaultFiles from "../default_files/default_files";

import * as Config from "Config"

class FileBrowserWrapper extends React.Component<any, any> {
    handleUploadFile = (key) => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            const preview = document.getElementById("file");
            const inputFile: any = document.querySelector("input[type=file]");
            const file = inputFile.files[0];
            console.log(file);
            const reader = new FileReader();

            const textFile = /text.*/;

            const props = this.props;

            if (file.type.match(textFile)) {
                reader.onload = function (event) {
                    console.log(event.target.result);
                    props.addFile([{ key: file.name, savedContent: event.target.result }], "");
                };
                reader.readAsText(file);
            } else {
                this.props.enqueueSnackbar(notify("It doesn't seem to be a text file!", "error", "File browser", this.props.closeSnackbar));
            }
        } else {
            this.props.enqueueSnackbar(notify("Your browser is too old to support HTML5 File API", this.props.closeSnackbar));
        }
    }

    handleCreateFolder = (key) => {
        this.props.addFolder(key);
    };

    handleCreateFiles = (files, prefix) => {
        this.props.addFile(files, prefix);
    };

    handleRenameFolder = (oldKey, newKey) => {
        this.props.renameFolder(oldKey, newKey, this.props.enqueueSnackbar.bind(this));
    }

    handleRenameFile = (oldKey, newKey) => {
        this.props.renameFile(oldKey, newKey);
        this.props.changeCurrentFile(newKey);
    };

    handleDeleteFolder = (folderKey) => {
        this.props.deleteFolder(folderKey);
    };

    handleDeleteFile = (fileKey) => {
        this.props.deleteFile(fileKey);
    };

    setDefaultFiles() {
        defaultFiles.folders.map(elem => {
            this.props.addFolder(elem.key);
        });

        this.props.addFile(defaultFiles.files, "");
        this.props.changeCurrentFile(Config.browser.defaultSelectedFileName);
    }

    componentDidMount() {
        if (this.props.files.length == 0) {
            this.setDefaultFiles();
        }
    }

    render() {
        return (
            <div>
                <FileBrowser
                    icons={FontAwesomeIcons(4)}
                    files={this.props.files}
                    openFolders={Config.browser.defaultOpenFolders}
                    selection={Config.browser.defaultSelection}

                    headerRenderer={false}

                    onCreateFolder={this.handleCreateFolder}

                    onCreateFiles={this.handleCreateFiles}

                    onMoveFolder={this.handleRenameFolder}
                    onMoveFile={this.handleRenameFile}

                    onRenameFolder={this.handleRenameFolder}
                    onRenameFile={this.handleRenameFile}

                    onDeleteFolder={this.handleDeleteFolder}
                    onDeleteFile={this.handleDeleteFile}

                    onUploadFile={this.handleUploadFile}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    files: store.files,
});

const mapDispatchToProps = dispatch => ({
    enqueueSnackbar: (message, options) => dispatch(actions.enqueueSnackbar(message /*options*/)),
    addFile: (files, prefix) => dispatch(actions.addFile(files, prefix)),
    changeCurrentFile: (name) => dispatch(actions.changeCurrentFile(name)),
    renameFolder: (currentKey, newKey, onError) => dispatch(actions.renameFolder(currentKey, newKey, onError)),
    renameFile: (currentKey, newKey) => dispatch(actions.renameFile(currentKey, newKey)),
    addFolder: (folderKey) => dispatch(actions.addFolder(folderKey)),
    deleteFolder: (folderKey) => dispatch(actions.deleteFolder(folderKey)),
    deleteFile: (fileKey) => dispatch(actions.deleteFile(fileKey)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowserWrapper);
