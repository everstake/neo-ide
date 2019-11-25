import React from "react";
import "./contextmenu.css";

class ContextMenu extends React.Component<any, any> {
    state = {
        visible: true,
    };

    componentDidMount() {
        window.addEventListener("contextmenu", this._handleContextMenu);
        window.addEventListener("click", this._handleClick);
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("contextmenu", this._handleContextMenu);
        window.removeEventListener("click", this._handleClick);
        window.removeEventListener("scroll", this._handleScroll);
    }

    _handleContextMenu = (event) => {
        event.preventDefault();

        this.setState({visible: true});

        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = (this as any).root.offsetWidth;
        const rootH = (this as any).root.offsetHeight;

        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if (right) {
            (this as any).root.style.left = `${clickX + 5}px`;
        }

        if (left) {
            (this as any).root.style.left = `${clickX - rootW - 5}px`;
        }

        if (top) {
            (this as any).root.style.top = `${clickY + 5}px`;
        }

        if (bottom) {
            (this as any).root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    _handleClick = (event) => {
        const {visible} = this.state;
        const wasOutside = !(event.target.contains === (this as any).root);

        if (wasOutside && visible) this.setState({visible: false});
    };

    _handleScroll = () => {
        const {visible} = this.state;

        if (visible) this.setState({visible: false});
    };


    buildFileSelector() {
        const fileSelector = document.createElement("input");
        fileSelector.setAttribute("type", "file");
        fileSelector.setAttribute("multiple", "multiple");
        return fileSelector;
    }

    onInput = () => {
        (this as any).fileSelector = this.buildFileSelector();
        (this as any).fileSelector.onchange = this.FileHandler;
        (this as any).fileSelector.click();
    };


    FileHandler = (e) => {
        console.log(e);
        const file = e.target.files[0];

        const reader: any = new FileReader();
        reader.readAsText(file);
        reader.filenName = file.name;

        reader.onload = function (readerEvent) {
            console.log(readerEvent.target.filenName);
        };


        console.log("d");
    };

    handelFileOrFolder() {
        if (this.props.contextmenu.folder === true) {

            return (

                <div className="contextMenu--option">Upload file</div>

            );
        }
        if (this.props.contextmenu.file === true) {
            return <div className="contextMenu--option">Open</div>;

        }
        if (this.props.contextmenu.outside === true) {
            return (
                <div>
                    <div className="contextMenu--option">Create Folder</div>
                    <div className="contextMenu--option" onClick={this.onInput}><input type="file" name="myfile"/>Upload
                    </div>
                </div>
            );

        }

    }

    render() {
        const {visible} = this.state;
        //this.props.test = ''
        return (visible || null) &&
            <div ref={ref => {
                (this as any).root = ref;
            }} className="contextMenu">
                {this.handelFileOrFolder()}

            </div>;
    }
}

export default ContextMenu;
