import Telegram from "@material-ui/icons/Telegram";
import React from "react";
import { connect } from "react-redux";
import CustomButtonView from "../components/ButtonView";

import { withTranslation } from "react-i18next";

const mouseClickEvents = ["mousedown", "click", "mouseup"];
function simulateMouseClick(element) {
    mouseClickEvents.forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1,
            }),
        ),
    );
}

class CustomButton extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
        const element = document.querySelector("i[class=\"fa fa-fw fa-play-circle\"]");
        simulateMouseClick(element);
    }

    render() {
        let content;
        if (this.props.file.deployed) {
            content = "deployed";
        } else {
            content = "deploy";
        }
        return (
            <CustomButtonView
                disabled={(!this.props.file.compiled && !this.props.file.deployed) || (this.props.file.deployed)}
                content={content}
                icon={Telegram}
                onClick={this.deploy}
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
    return {
        file: file,
    };
};

export default withTranslation()(connect(mapStateToProps)(CustomButton));
