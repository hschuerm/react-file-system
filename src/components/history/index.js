import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';

import HistoryItem from './historyItem';

class History extends React.Component {

    createHistoryByFolderController(folderController, historyItems = []) {
        if (folderController.parentFolderController) {
            historyItems = this.createHistoryByFolderController.call(this, folderController.parentFolderController, historyItems);
        }
        historyItems.push({
            name: folderController.getName(),
            onClick: () => this.props.setCurrFolder(folderController)
        });
        return historyItems;
    }

    createHistoryItem(item, index) {
        return <HistoryItem key={index} {...item} />
    }

    render() {
        let historyItems = this.createHistoryByFolderController.call(this, this.props.currFolderController);
        return (
            <Breadcrumb className="file-system-history">
                {historyItems.map(this.createHistoryItem, this)}
            </Breadcrumb>
        );
    }
}

History.propTypes = {
    currFolderController: PropTypes.object,
    setCurrFolder: PropTypes.func
};

export default History;