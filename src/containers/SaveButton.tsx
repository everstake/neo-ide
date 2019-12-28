import React from "react";
import * as actions from "../actions/index";
import {connect} from "react-redux";
import CustomButtonView from "../components/ButtonView";

import SaveIcon from "@material-ui/icons/Save";

class CustomButton extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.saveFile = this.saveFile.bind(this);
    }

    saveFile() {
        this.props.saveFile(this.props.file.key, this.props.file);
    }

    render() {
        let content;
        if (this.props.autosave) {
            content = "autosave";
        } else if (this.props.file.saved) {
            content = "saved";
        } else {
            content = "save";
        }

        return (
            <CustomButtonView
                disabled={this.props.file.saved}
                content={content}
                onClick={this.saveFile}
                icon={SaveIcon}
            />
        );
    }
}

const mapStateToProps = (store) => {
    let file = {};
    store.files.forEach(elem => {
        if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
            file = elem;
        }
    });
    return {file: file, autosave: store.settings.autosave};
};

const mapDispatchToProps = dispatch => ({
    saveFile: (name, fileObj) => dispatch(actions.saveFile(name, fileObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton);
