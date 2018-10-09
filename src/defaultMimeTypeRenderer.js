import React from 'react';

export default {
    "text": () => { return <div className="item-icon">txt</div>; },
    "image": (props) => { return <img className="preview-img" src={props.src} />; },
    "audio": () => { return <div className="item-icon">audio</div>; },
    "video": () => { return <div className="item-icon">video</div>; },
    "application": () => { return <div className="item-icon">{"< />"}</div>; },
    "application/pdf": () => { return <div className="item-icon">pdf</div>; },
};