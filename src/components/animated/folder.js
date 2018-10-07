import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ListGroup, ListGroupItem, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import FlipMove from 'react-flip-move';

import BasicFile from './file';

class BasicFolder extends Component {

    constructor() {
        super();

        this.state = {
            zoomIndex: null
        };

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
            return <ListGroupItem key={folderController.getPath() + item.name}
                className="file-system-file"
                onContextMenu={evt => folderController.onContextMenu(evt, item)}>

                <BasicFile {...item} nameSize={this.NameSize} updatedAtSize={this.UpdatedAtSize} />
            </ListGroupItem>
        });
    }

    renderFolderItem(folder) {
        let { switchFolder, folderController } = this.props;

        return <ListGroupItem key={folderController.getPath() + folder.name}
            onClick={() => switchFolder(folder)}
            className="file-system-folder"
            onContextMenu={evt => folderController.onContextMenu(evt, folder)}>

            <Glyphicon glyph="folder-close" /> {folder.name}
        </ListGroupItem>
    }

    render() {
        let name = this.props.folderController.getName();
        return (
            <div className="folder">
                <h3>
                    <Glyphicon glyph={"folder-open"} /> {name}
                </h3>
                <ListGroup style={{ position: "relative" }}>
                    {this.renderFileHeader.call(this)}
                    <FlipMove typeName={null} duration={150} enterAnimation="fade" leaveAnimation="fade" staggerDelayBy={10}>
                        {this.renderItems.call(this)}
                    </FlipMove>
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