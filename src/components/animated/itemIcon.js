import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

import DefaultMimeTypeRenderer from '../../defaultMimeTypeRenderer';

class AnimatedItemIcon extends Component {
    getContent() {
        let { items, mimeType } = this.props;
        const MimeTypeRenderer = Object.assign(DefaultMimeTypeRenderer, {}/*custom mimeTypeRenderer*/);
        let content = null;

        if (items) {
            return <Glyphicon glyph="folder-close" />
        }

        if (mimeType) {
            mimeType = mimeType.toLowerCase();
            switch (true) {
                case mimeType === "application/pdf": return MimeTypeRenderer["application/pdf"](this.props);
                case mimeType.indexOf("text") !== -1: return MimeTypeRenderer["text"](this.props);
                case mimeType.indexOf("image") !== -1: return MimeTypeRenderer["image"](this.props);
                case mimeType.indexOf("audio") !== -1: return MimeTypeRenderer["audio"](this.props);
                case mimeType.indexOf("video") !== -1: return MimeTypeRenderer["video"](this.props);
                case mimeType.indexOf("application") !== -1: return MimeTypeRenderer["application"](this.props);
            }
        }

        return content;
    }

    render() {
        return (
            <div className="item-icon-container">
                {this.getContent.call(this)}
            </div>
        )
    }
};

AnimatedItemIcon.propTypes = {
    items: PropTypes.array,
    src: PropTypes.any,
    mimeType: PropTypes.string
};

export default AnimatedItemIcon;