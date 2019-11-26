import React from "react";
import MonacoEditor from "react-monaco-editor";
import { connect } from "react-redux";
import * as actions from "./actions/index";

import * as Config from "Config";

class App extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.onChange = this.onChange.bind(this);
    }

    updateDimensions = () => {
        this.setState({
            width: window.innerWidth,
        });
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    editorDidMount(editor, monaco) {
        console.log("editorDidMount", editor);
        editor.focus();
    }

    onChange(newValue, e) {
        this.props.changeFileSaved(
            this.props.currentFile,
            newValue,
            this.props.autosave,
        );
    }

    editorWillMount(monaco) {
        console.log(monaco);
        // monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        //     validate: true,
        //     schemas: [{
        //         uri: "http://myserver/foo-schema.json",
        //         fileMatch: ['*'],
        //         schema: {
        //             type: "object",
        //             properties: {
        //                 p1: {
        //                     enum: [ "v1", "v2"]
        //                 },
        //                 p2: {
        //                     $ref: "http://myserver/bar-schema.json"
        //                 }
        //             }
        //         }
        //     }]
        // });
    }

    render() {
        const options = {
            selectOnLineNumbers: true,
            readOnly: !this.props.currentFile,
            wordBasedSuggestions: this.props.autocomplete
        };
        let editorContent = this.props.value;
        if (!this.props.currentFile) {
            editorContent = "// create or upload a file to get started";
        }
        return (
            <MonacoEditor
                width={this.state.width}
                height={this.state.height}
                language={this.props.fileLang}
                theme="vs-dark"
                value={editorContent}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
                editorWillMount={this.editorWillMount}
            />
        );
    }
}

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
        autosave: store.settings.autosave,
        autocomplete: store.settings.autocomplete
    };
};

const mapDispatchToProps = dispatch => ({
    changeFileSaved: (fileName, newContent, autosave) => dispatch(actions.changeFileSaved(fileName, newContent, autosave)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);