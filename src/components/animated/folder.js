import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import FlipMove from 'react-flip-move';

import AnimatedItem from './item';

class AnimatedFolder extends Component {

    constructor() {
        super();

        this.IconSize = {
            xs: 3,
            sm: 2,
            md: 1
        };

        this.NameSize = {
            xs: 5,
            sm: 6,
            md: 7
        };

        this.UpdatedAtSize = {
            xs: 4,
            sm: 4,
            md: 4
        };
    }

    renderFileHeader() {
        return <ListGroupItem className="file-system-file-header">
            <Row>
                <Col {...this.IconSize} />
                <Col {...this.NameSize}>name</Col>
                <Col {...this.UpdatedAtSize}>updated at</Col>
            </Row>
        </ListGroupItem>
    }

    createItem(item) {
        let { folderController, switchFolder } = this.props;
        return <AnimatedItem key={folderController.getPath() + item.name}
            onItemReady={api => folderController._addItemToApi(item.name, api)}
            item={item}
            folderController={folderController}
            switchFolder={switchFolder}
            iconSize={this.IconSize}
            nameSize={this.NameSize}
            updatedAtSize={this.UpdatedAtSize} />
    }

    render() {
        let { folderController } = this.props;
        let items = folderController.getItems();
        return (
            <div className="folder">
                <ListGroup style={{ position: "relative" }}>
                    {this.renderFileHeader.call(this)}
                    <FlipMove typeName={null} duration={150} enterAnimation="fade" leaveAnimation="fade" staggerDelayBy={10}>
                        {items.map(this.createItem, this)}
                    </FlipMove>
                </ListGroup>
            </div>
        )
    }
};

AnimatedFolder.propTypes = {
    folderController: PropTypes.object,
    switchFolder: PropTypes.func
};

export default AnimatedFolder;