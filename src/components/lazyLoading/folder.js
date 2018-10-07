import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap';

import LazyLoadingFile from './file';

class LazyLoadingFolder extends Component {

    renderFileItems() {
        let { folderController } = this.props;
        let fileItems = folderController.getFileItems();
        return fileItems.map((file, index) => {
            return <ListGroupItem key={index} className="file-system-file">
                <LazyLoadingFile {...file} />
            </ListGroupItem>
        });
    }

    renderFolderItems() {
        let { folderController, switchFolder } = this.props;
        let folderItems = folderController.getFolderItems();
        return folderItems.map((folder, index) => {

            return <Button key={index} onClick={() => switchFolder(folder)} className="file-system-folder">
                <Glyphicon glyph="folder-close" /> {folder.name}
            </Button>
        });
    }

    render() {
        let name = this.props.folderController.getName();
        return (
            <div className="folder">
                <h3>
                    <Glyphicon glyph={"folder-open"} /> {name}
                </h3>
                <ButtonGroup>
                    {this.renderFolderItems.call(this)}
                </ButtonGroup>
                <ListGroup>
                    {this.renderFileItems.call(this)}
                </ListGroup>
            </div>
        )
    }
};

LazyLoadingFolder.propTypes = {
    folderController: PropTypes.object,
    switchFolder: PropTypes.func
};

export default LazyLoadingFolder;