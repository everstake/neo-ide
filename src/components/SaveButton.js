import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React from "react";
import * as actions from '../actions/index'
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));


function CustomButtonView(props) {
    const classes = useStyles();
    return (<Button
        disabled={props.disabled}
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon/>}
        onClick={props.saveFile}
        args={props.args}
    > {props.content} </Button>);
}

class CustomButton extends React.Component {
    constructor(props) {
        super(props);

        this.saveFile = this.saveFile.bind(this);
    }

    saveFile() {
        this.props.saveFile(this.props.file.key, this.props.file)
    }

    render() {
        let content;
        if (this.props.saved) {
            content = "saved"
        } else {
            content = "save"
        }

        return (
            <CustomButtonView disabled={this.props.file.saved} content={content} saveFile={this.saveFile}
                              args={{lala: 15}}/>
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
    return {file: file};
};

const mapDispatchToProps = dispatch => ({
    saveFile: (name, fileObj) => dispatch(actions.saveFile(name, fileObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton)