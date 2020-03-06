import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import * as actions from "../actions/index";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import * as Config from "Config";

import { withTranslation } from "react-i18next";

const mapStateToProps = (store) => {
    return {
        settings: store.settings,
    };
};

const mapDispatchToProps = dispatch => ({
    changeSetting: (param, value) => dispatch(actions.changeSetting(param, value)),
});

const languagesPanel = props => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = event => {
        props.changeSetting("lang", event.target.innerText);
        props.i18n.changeLanguage(event.target.innerText);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <FormGroup>
            <p>{props.t("Choose your language")}</p>
            <Button aria-controls="fade-menu" color="primary"
                aria-haspopup="true" onClick={handleClick}>
                {props.settings.lang}
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
                    Config.languages.map(lang =>{
                        return <MenuItem onClick={handleSelect}>{lang}</MenuItem>;
                    })
                }
            </Menu>
        </FormGroup>
    );
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(languagesPanel));
