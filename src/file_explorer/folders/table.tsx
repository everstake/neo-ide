import React from "react";
import ClassNames from "classnames";
import flow from "lodash/flow";
import {DragSource, DropTarget} from "react-dnd";
import {NativeTypes} from "react-dnd-html5-backend";

import BaseFolder, {BaseFolderConnectors} from "./../base-folder";
import {BaseFileConnectors} from "./../base-file";

class RawTableFolder extends BaseFolder {
    render() {
        const {
            isOpen, isDragging, isDeleting, isRenaming, isDraft, isOver, isSelected,
            action, url, browserProps, connectDragPreview, depth,
        } = this.props;

        const icon = browserProps.icons[isOpen ? "FolderOpen" : "Folder"];
        const inAction = (isDragging || action);

        let name;
        if (!inAction && isDeleting) {
            name = (
                <form className="deleting" onSubmit={this.handleDeleteSubmit}>
                    <a
                        href={url}
                        download="download"
                        onClick={(this as any).handleFileClick}
                    >
                        {icon}
                        {this.getName()}
                    </a>
                    <div>
                        <button type="submit">
                            Confirm Deletion
                        </button>
                    </div>
                </form>
            );
        } else if ((!inAction && isRenaming) || isDraft) {
            name = (
                <div>
                    <form className="renaming" onSubmit={this.handleRenameSubmit}>
                        {icon}
                        <input
                            type="text"
                            ref={el => {
                                (this as any).newNameRef = el;
                            }}
                            value={this.state.newName}
                            onChange={this.handleNewNameChange}
                            onBlur={this.handleCancelEdit}
                            autoFocus
                        />
                    </form>
                </div>
            );
        } else {
            name = (
                <div>
                    <a onClick={this.toggleFolder}>
                        {icon}
                        {this.getName()}
                    </a>
                </div>
            );
        }

        if (typeof browserProps.moveFolder === "function") {
            name = connectDragPreview(name);
        }

        const folder = (
            <tr
                className={ClassNames("folder", {
                    pending: action,
                    dragging: isDragging,
                    dragover: isOver,
                    selected: isSelected,
                })}
                onClick={this.handleFolderClick}
                onDoubleClick={this.handleFolderDoubleClick}
            >
                <td className="name">
                    <div style={{paddingLeft: (depth * 16) + "px"}}>
                        {name}
                    </div>
                </td>
                <td/>
                <td/>
            </tr>
        );

        return this.connectDND(folder);
    }
}

// @DragSource('folder', BaseFolderConnectors.dragSource, BaseFolderConnectors.dragCollect)
// @DropTarget(
//   ['file', 'folder', NativeTypes.FILE],
//   BaseFileConnectors.targetSource,
//   BaseFileConnectors.targetCollect,
// )
class TableFolder extends RawTableFolder {
}

export default flow(
    DragSource(
        "folder",
        BaseFolderConnectors.dragSource,
        BaseFolderConnectors.dragCollect,
    ),
    DropTarget(
        ["file", "folder", NativeTypes.FILE],
        BaseFileConnectors.targetSource,
        BaseFileConnectors.targetCollect,
    ),
)(TableFolder);
export {RawTableFolder};
