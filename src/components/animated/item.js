import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Glyphicon, Row, Col } from 'react-bootstrap';
import Moment from 'moment';

import AnimatedFile from './file';
import EditItem from './editItem';
import ItemIcon from './itemIcon';

class AnimatedItem extends Component {
    constructor() {
        super();

        this.state = {
            editMode: false
        };
    }

    componentDidMount() {
        this.props.onItemReady({
            setEditMode: (mode = !this.state.editMode) => this.setState({ editMode: mode })
        });
    }

    onRenameSubmit(name) {
        const { folderController, item } = this.props;
        folderController.modifyItemByName(item.name, { name: name });
        folderController.onRenameFinished(name);
    }

    onRenameCancel() {
        const { folderController } = this.props;
        this.setState({ editMode: false })
        folderController.onRenameAborted.call(folderController);
    }

    render() {
        const { item, folderController, switchFolder, iconSize, nameSize, updatedAtSize } = this.props;

        let onClick = item.items && !this.state.editMode ? () => switchFolder(item) : undefined;
        return (
            <ListGroupItem
                className={"file-system-item file-system-" + (item.items ? "folder" : "file")}
                onClick={onClick}
                onContextMenu={evt => folderController.onContextMenu(evt, item)}>

                <Row>
                    <Col {...iconSize}><ItemIcon {...item} /></Col>
                    <Col {...nameSize}>{this.state.editMode ?
                        <EditItem defaultValue={item.name}
                            isValidRename={folderController.isValidRename.bind(folderController, item.name)}
                            onExit={this.onRenameCancel.bind(this)}
                            onSubmit={this.onRenameSubmit.bind(this)} />
                        : item.name}
                    </Col>
                    <Col {...updatedAtSize}>{Moment(item.updatedAt).format("L LTS")}</Col>
                </Row>
            </ListGroupItem>
        )
    }
};

AnimatedItem.propTypes = {
    item: PropTypes.object.isRequired,
    folderController: PropTypes.object.isRequired,
    switchFolder: PropTypes.func.isRequired,
    onItemReady: PropTypes.func.isRequired,

    iconSize: PropTypes.object,
    nameSize: PropTypes.object,
    updatedAtSize: PropTypes.object
};

export default AnimatedItem;