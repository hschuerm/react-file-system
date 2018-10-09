export default class FolderController {
    constructor(items, name, parentFolderController, refreshUI) {
        this._name = name;
        this.parentFolderController = parentFolderController;
        this.refreshUI = refreshUI;

        this.onContextMenu = () => { };
        this.onError = () => { };
        this.onRenameFinished = () => { };
        this.onRenameAborted = () => { };

        this._folderItems = null;
        this._fileItems = null;
        this._path = this._determineParentFolderName();

        this.itemApi = {};

        if (items) {
            this._setItems(items);
        }
        this.rename = this.rename.bind(this);
    }

    _seperateFolderAndFiles() {
        this._folderItems = [];
        this._fileItems = [];
        this._items.forEach(item => {
            if (item.items) {
                this._folderItems.push(item);
                return;
            }
            this._fileItems.push(item);
        });
    }

    _checkName(name) {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (item.name === name) {
                return false;
            }
        }
        return true;
    }

    _modifyItem(index, modifiedItem, oldName) {
        if (modifiedItem.name && !this.isValidRename(oldName, modifiedItem.name)) {
            this.onError(new Error("name allready exists in dir"));
            return false;
        }
        let items = this._items;
        items[index] = Object.assign(items[index], modifiedItem);
        this._setItems(items);
    }

    _determineParentFolderName(path = "", folderController = this) {
        if (folderController.parentFolderController) {
            path = this._determineParentFolderName(path, folderController.parentFolderController || false);
        }
        path += folderController.getName() + "/";
        return path;
    }

    _setItems(items) {
        this._items = items;
        this._seperateFolderAndFiles();
        this.refreshUI();
    }

    _addItemToApi(name, item) {
        this.itemApi[name] = item;
    }

    getPath() {
        return this._path;
    }

    getItems() {
        return this._items;
    }

    getName() {
        return this._name;
    }

    getFolderItems() {
        return this._folderItems;
    }

    getFileItems() {
        return this._fileItems;
    }


    onItemsLoaded(items) {
        this._setItems(items);
    }

    addItem(item) {
        if (!item.name) {
            this.onError(new Error("no name provided"));
            return false;
        }
        if (!this._checkName(item.name)) {
            this.onError(new Error("name allready exists in dir"));
            return false;
        }
        let items = this.getItems();
        items.push(item);
        this._setItems(items);
    }

    rename(oldName) {
        return new Promise((resolve, reject) => {
            if (!this.itemApi[oldName]) {
                this.onError(new Error("item doesnt exists in dir"));
                return false;
            }
            this.itemApi[oldName].setEditMode();
            this.onRenameFinished = resolve;
            this.onRenameAborted = reject;
        });
    }

    isValidRename(oldName, newName) {
        if (oldName === newName) {
            return true;
        }
        if (!newName || newName.length < 1) {
            return false;
        }
        return this._checkName(newName);
    }

    modifyItemByName(name, modifiedItem) {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (item.name === name) {
                this._modifyItem(i, modifiedItem, name);
                return;
            }
        }
    }

    removeItemByName(name) {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (item.name === name) {
                let items = this.getItems();
                items.splice(i, 1);
                this._setItems(items);
                return;
            }
        }
    }

    sortItems(sortingKey, ASC = true) {
        let items = this.getItems();
        items.sort((a, b) => {
            let val = ASC ? 1 : -1;
            if (a[sortingKey] > b[sortingKey]) {
                return val * 1;
            }
            if (a[sortingKey] < b[sortingKey]) {
                return val * -1;
            }
            return 0;
        });
        this._setItems(items);
    }
};