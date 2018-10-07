import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LazyLoadingFile extends Component {
    render() {
        const { name } = this.props;
        return (
            <div className="file">
                {name}
            </div>
        )
    }
};

LazyLoadingFile.propTypes = {
    name: PropTypes.string.isRequired
};

export default LazyLoadingFile;