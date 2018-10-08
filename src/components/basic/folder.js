import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ListGroup, ListGroupItem, ButtonGroup, Button, Row, Col } from 'react-bootstrap';

import BasicFile from './file';

class BasicFolder extends Component {

    constructor() {
        super();

        this.NameSize = {
            xs: 6,
            sm: 8
        };

        this.UpdatedAtSize = {
            xs: 6,
            sm: 4
        };
    }

    renderFileHeader() {
        return <ListGroupItem className="file-system-file-header">
            <Row>
                <Col {...this.NameSize}>name</Col>
                <Col {...this.UpdatedAtSize}>updated at</Col>
            </Row>
        </ListGroupItem>
    }

    renderItems() {
        let { folderController } = this.props;
        let items = folderController.getItems();
        return items.map((item, index) => {
            if (item.items) {
                return this.renderFolderItem.call(this, item, index);
            }
            return <ListGroupItem key={index} className="file-system-file" onContextMenu={evt => folderController.onContextMenu(evt, item)}>
                <BasicFile {...item} nameSize={this.NameSize} updatedAtSize={this.UpdatedAtSize} />
            </ListGroupItem>;
        });
    }

    renderFolderItem(folder, index) {
        let { switchFolder, folderController } = this.props;

        return <ListGroupItem key={index} onClick={() => switchFolder(folder)} className="file-system-folder" onContextMenu={evt => folderController.onContextMenu(evt, folder)}>
            <Glyphicon glyph="folder-close" /> {folder.name}
        </ListGroupItem>;
    }

    render() {
        let name = this.props.folderController.getName();
        return (
            <div className="folder">
                <h3>
                    <Glyphicon glyph={"folder-open"} /> {name}
                </h3>
                <ListGroup>
                    {this.renderFileHeader.call(this)}
                    {this.renderItems.call(this)}
                </ListGroup>
            </div>
        )
    }
};

BasicFolder.propTypes = {
    folderController: PropTypes.object,
    switchFolder: PropTypes.func
};

export default BasicFolder;