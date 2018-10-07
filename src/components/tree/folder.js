import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Collapse } from 'react-bootstrap';

import CreateTreeItem from '../../createTreeItem';

class TreeFolder extends Component {
    constructor(props) {
        super(props);

        this.folderController = props.folderController;

        this.state = {
            open: props.open
        };
    }

    render() {
        let items = this.folderController.getItems();
        let name = this.folderController.getName();
        return (
            <div className="folder">
                <label onClick={() => this.setState({ open: !this.state.open })}>
                    <Glyphicon glyph={this.state.open ? "folder-open" : "folder-close"} /> {name}
                </label>
                <Collapse in={this.state.open}>
                    <div className="folder-items">
                        {items.map(CreateTreeItem)}
                    </div>
                </Collapse>
            </div>
        )
    }
};

TreeFolder.defaultProps = {
    open: false
};

TreeFolder.propTypes = {
    folderController: PropTypes.object,

    open: PropTypes.bool
};

export default TreeFolder;