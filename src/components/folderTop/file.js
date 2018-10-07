import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Moment from 'moment';

class FolderTopFile extends Component {
    render() {
        const { name, updatedAt, nameSize, updatedAtSize } = this.props;
        return (
            <div className="file">
                <Row>
                    <Col {...nameSize}>{name}</Col>
                    <Col {...updatedAtSize}>{Moment(updatedAt).format("L LTS")}</Col>
                </Row>
            </div>
        )
    }
};

FolderTopFile.propTypes = {
    name: PropTypes.string.isRequired,
    updatedAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    nameSize: PropTypes.object,
    updatedAtSize: PropTypes.object
};

export default FolderTopFile;