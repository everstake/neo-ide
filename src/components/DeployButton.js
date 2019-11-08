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
        onClick={props.deploy}
        args={props.args}
    > {props.content} </Button>);
}

class CustomButton extends React.Component {
    constructor(props) {
        super(props);
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
        this.props.changeFileDeployed(this.props.file.key)
    }

    render() {
        let content;
        if (this.props.saved) {
            content = "deployed"
        } else {
            content = "deploy"
        }
        console.log("deployed: ", this.props.file.saved);
        return (
            <CustomButtonView
                disabled={(!this.props.file.compiled && !this.props.file.deployed) || (this.props.file.deployed)}
                content={content} deploy={this.deploy} args={{lala: 15}}/>
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
    changeFileDeployed: (name) => dispatch(actions.changeFileDeployed(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton)