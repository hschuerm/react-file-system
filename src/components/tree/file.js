import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TreeFile extends Component {
    render() {
        const { name } = this.props;
        return (
            <div className="file">
                {name}
            </div>
        )
    }
};

TreeFile.propTypes = {
    name: PropTypes.string.isRequired
};

export default TreeFile;