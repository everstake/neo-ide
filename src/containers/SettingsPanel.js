import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import * as actions from '../actions/index'
import {connect} from 'react-redux';

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
      value: fileContent,
      currentFile: store.currentFile,
      fileLang: fileLang,
      settings: store.settings
  };
};

const mapDispatchToProps = dispatch => ({
  changeSetting: (param, value) => dispatch(actions.changeSetting(param, value)),
  changeFileSaved: (fileName, newContent, autosave) => dispatch(actions.changeFileSaved(fileName, newContent, autosave))
});

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const settingsPanel = function CustomizedSwitches(props) {

  const handleChange = name => event => {
    if (name === 'autosave' && !props.settings.autosave) {
      props.changeFileSaved(props.currentFile, props.value, true)
    }
    props.changeSetting(name, !props.settings[name])
  };

  return (
    <FormGroup>
      <p>Editor settings:</p>
      <FormControlLabel
        control={
          <PurpleSwitch
            checked={props.settings.autosave}
            onChange={handleChange('autosave')}
            // value="checkedA"
          />
        }
        label="Autosave"
      />
      <FormControlLabel
        control={
          <PurpleSwitch
            checked={props.settings.autocomplete}
            onChange={handleChange('autocomplete')}
            // value="checkedB"
          />
        }
        label="Autocompletion"
      />
    </FormGroup>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(settingsPanel)