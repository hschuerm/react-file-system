import React from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbItem } from 'react-bootstrap';

class HistoryItem extends React.Component {

    render() {
        let { name, onClick } = this.props;
        return (
            <BreadcrumbItem className="file-system-history-item" onClick={onClick}>
                {name}
            </BreadcrumbItem>
        );
    }
}

HistoryItem.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default HistoryItem;