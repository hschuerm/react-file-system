import React, { Component } from 'react';
import PropTypes from 'prop-types';

import History from './components/history/';
import FolderController from './folderController';
import TreeFolder from './components/tree/folder';
import FolderTopFolder from './components/folderTop/folder';
import BasicFolder from './components/basic/folder';
import AnimatedFolder from './components/animated/folder';

class ReactFileSystem extends Component {
    constructor(props) {
        super(props);

        this.refreshUI = () => this._mounted && this.forceUpdate();

        this.state = {
            currFolderController: new FolderController(props.tree, props.rootFolderName, null, this.refreshUI.bind(this))
        };
    }

    componentDidMount() {
        this._mounted = true;
        if (this.props.onRootFolderReady) {
            this.props.onRootFolderReady(this.state.currFolderController)
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    switchFolder(data, folder) {
        if (!folder) {
            folder = new FolderController(data.items, data.name, this.state.currFolderController, this.refreshUI.bind(this));
        }
        this.setState({
            currFolderController: folder
        })

        if (this.props.onFolderSwitched) {
            this.props.onFolderSwitched(folder)
        }
    }

    getFolderType() {
        const { display, onItemSelected } = this.props;
        let props = {
            folderController: this.state.currFolderController,
            switchFolder: this.switchFolder.bind(this),
            onItemSelected
        };
        switch (display.toLowerCase()) {
            case "tree": return <TreeFolder {...props} />
            case "foldertop": return <FolderTopFolder {...props} />
            case "basic": return <BasicFolder {...props} />
            case "animated": return <AnimatedFolder {...props} />
            default: return null;
        }
    }

    render() {
        return (
            <div className="react-file-system">
                <History currFolderController={this.state.currFolderController}
                    setCurrFolder={folder => this.switchFolder(null, folder)} />
                {this.getFolderType.call(this)}
            </div>
        )
    }
};

ReactFileSystem.defaultProps = {
    display: "foldertop",
    tree: []
};

ReactFileSystem.propTypes = {
    rootFolderName: PropTypes.string.isRequired,
    
    tree: PropTypes.array,
    display: PropTypes.string,
    onRootFolderReady: PropTypes.func,
    onFolderSwitched: PropTypes.func,
    onItemSelected: PropTypes.func
};

export default ReactFileSystem;