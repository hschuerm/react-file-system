import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ListGroup, ListGroupItem, ButtonGroup, Button, Row, Col } from 'react-bootstrap';

import FolderTopFile from './file';

class FolderTopFolder extends Component {

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

    renderFileItems() {
        let { folderController } = this.props;
        let fileItems = folderController.getFileItems();
        return fileItems.map((file, index) => {
            return <ListGroupItem key={index} className="file-system-file">
                <FolderTopFile {...file} nameSize={this.NameSize} updatedAtSize={this.UpdatedAtSize} />
            </ListGroupItem>
        });
    }

    renderFolderItems() {
        let { folderController, switchFolder } = this.props;
        let folderItems = folderController.getFolderItems();

        return folderItems.map((folder, index) => {
            let onClick = () => {
                this.setState({ zoomIndex: index })
                setTimeout(() => {
                    this.setState({ zoomIndex: null })
                    switchFolder(folder)
                }, 200);
            };
            let className = "file-system-folder" + (this.state.zoomIndex === index ?
                " changing" : "");

            return <Button key={index} onClick={onClick} className={className}>
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
                    {this.renderFileHeader.call(this)}
                    {this.renderFileItems.call(this)}
                </ListGroup>
            </div>
        )
    }
};

FolderTopFolder.propTypes = {
    folderController: PropTypes.object,
    switchFolder: PropTypes.func
};

export default FolderTopFolder;