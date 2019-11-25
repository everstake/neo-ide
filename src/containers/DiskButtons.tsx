import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import * as actions from "../actions/index";
import {connect} from "react-redux";
import notify from "../utils/notificator";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import * as FileSaver from "file-saver";

const diskButtons = function GroupedButtons(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleUploadFile = () => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            const preview = document.getElementById("file");
            const inputFile: any = document.querySelector("input[type=file]");
            const file = inputFile.files[0];
            console.log(file);
            const reader = new FileReader();

            const textFile = /text.*/;

            if (file.type.match(textFile)) {
                reader.onload = function (event) {
                    console.log(event.target.result);
                    props.addFile([{key: file.name, savedContent: event.target.result}], "");
                };
                reader.readAsText(file);
            } else {
                props.enqueueSnackbar(notify("It doesn't seem to be a text file!", "error", "File browser", props.closeSnackbar));
            }
        } else {
            props.enqueueSnackbar(notify("Your browser is too old to support HTML5 File API", props.closeSnackbar));
        }
    };

    const saveFile = (name, content) => {
        const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, name);
    };

    const handleDownloadCurrentFile = () => {
        setAnchorEl(null);
        saveFile(props.currentFile, props.value);
    };

    const handleDownloadAllFiles = () => {
        setAnchorEl(null);
        props.files.forEach(file => {
            if (file.file) {
                const fileName = file.key.replace(/^.*[\\\/]/, "");
                saveFile(fileName, file.currentContent);
            }
        });
    };

    const handleDownloadFile = filePath => {
        setAnchorEl(null);
        props.files.forEach(file => {
            if (file.key === filePath) {
                const fileName = filePath.replace(/^.*[\\\/]/, "");
                saveFile(fileName, file.currentContent);
            }
        });
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let isAnyFiles = false;

    props.files.forEach(file => {
        if (file.file) {
            isAnyFiles = true;
        }
    });
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
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
                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
            Download
                    </Button>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        {
                            (
                                isAnyFiles &&
                [
                    <MenuItem onClick={handleDownloadCurrentFile}>Download current</MenuItem>,
                    <MenuItem onClick={handleDownloadAllFiles}>Download all</MenuItem>,
                    props.files.map((file, id) => {
                        if (file.file) {
                            return (
                                <MenuItem onClick={() => { handleDownloadFile(file.key) ; }}>{file.key}</MenuItem>
                            );
                        }
                    }),
                ]
                            ) || (
                                <MenuItem onClick={handleClose}>
                  Create file first
                                </MenuItem>
                            )
                        }
                    </Menu>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (store) => {
    let fileContent = "";
    let fileLang;
    store.files.forEach(elem => {
        if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
            fileContent = elem.currentContent;
            fileLang = elem.lang;
        }
    });
    return {
        files: store.files,
        value: fileContent,
        currentFile: store.currentFile,
        fileLang: fileLang,
        autosave: store.settings.autosave,
    };
};

const mapDispatchToProps = dispatch =>({
    enqueueSnackbar: (message, options)=>dispatch(actions.enqueueSnackbar(message /*options*/)),
    addFile: (files, prefix) => dispatch(actions.addFile(files, prefix)),
    changeCurrentFile: (name)=>dispatch(actions.changeCurrentFile(name)),
    renameFolder: (currentKey, newKey, onError)=>dispatch(actions.renameFolder(currentKey, newKey, onError)),
    renameFile: (currentKey, newKey)=>dispatch(actions.renameFile(currentKey, newKey)),
    addFolder: (folderKey)=>dispatch(actions.addFolder(folderKey)),
    deleteFolder: (folderKey)=>dispatch(actions.deleteFolder(folderKey)),
    deleteFile: (fileKey)=>dispatch(actions.deleteFile(fileKey)),
    closeSnackbar: (key)=>dispatch(actions.closeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(diskButtons);
