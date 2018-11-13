import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Row, Col } from 'react-bootstrap';
import Moment from 'moment';

import 'moment/locale/de';

import EditItem from './editItem';
import ItemIcon from './itemIcon';

Moment.locale("de");

class AnimatedItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        };

        this.isDir = false;
        if (props.item.items) {
            this.isDir = true;
        }
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

    getOnClick() {
        let { item, switchFolder, onItemSelected } = this.props;

        if (this.state.editMode) {
            return;
        }

        if (this.isDir) {
            return () => switchFolder(item);
        }

        if (onItemSelected) {
            return () => onItemSelected(item);
        }
    }

    getItemSize() {
        let { item } = this.props;

        if (this.isDir || !item.size) {
            return null;
        }

        if (item.size < 999) {
            return item.size + " B"
        }

        if (item.size < 999999) {
            return (item.size / 1000).toFixed(1) + " KB"
        }

        if (item.size < 999999999) {
            return (item.size / 1000000).toFixed(1) + " MB"
        }

        return (item.size / 1000000000).toFixed(1) + " GB"
    }

    render() {
        const { item, folderController, iconSize, nameSize, byteSize, updatedAtSize } = this.props;

        return (
            <ListGroupItem
                className={"file-system-item file-system-" + (this.isDir ? "folder" : "file")}
                onClick={this.getOnClick.call(this)}
                onContextMenu={evt => folderController.onContextMenu(evt, item)}>

                <Row>
                    <Col {...iconSize}><ItemIcon {...item} /></Col>
                    <Col {...nameSize} className="item-name">{this.state.editMode ?
                        <EditItem defaultValue={item.name}
                            isValidRename={folderController.isValidRename.bind(folderController, item.name)}
                            onExit={this.onRenameCancel.bind(this)}
                            onSubmit={this.onRenameSubmit.bind(this)} />
                        : item.name}
                    </Col>
                    <Col {...byteSize}>{this.getItemSize.call(this)}</Col>
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
    byteSize: PropTypes.object,
    updatedAtSize: PropTypes.object,


    onItemSelected: PropTypes.func,
};

export default AnimatedItem;