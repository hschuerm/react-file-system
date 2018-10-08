import React from 'react';

import File from './components/tree/file';
import Folder from './components/tree/folder'
import FolderController from './folderController';

export default function CreateTreeItem(item, index) {
    if (item.items) {
        let folderController = new FolderController(item.items, item.name);
        return <Folder key={index} folderController={folderController} />;
    }

    return <File key={index} {...item} />
};