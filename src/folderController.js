export default class FolderController {
    constructor(items, name, parentFolderController, refreshUI) {
        this._name = name;
        this.parentFolderController = parentFolderController;
        this.refreshUI = refreshUI;

        this.onContextMenu = () => { };
        this.onError = () => { };

        this._folderItems = null;
        this._fileItems = null;
        this._path = this._determineParentFolderName();

        if (items) {
            this._setItems(items);
        }

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

    _modifyItem(index, modifiedItem) {
        if (modifiedItem.name && !this._checkName(modifiedItem.name)) {
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

    modifyItemByName(name, modifiedItem) {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (item.name === name) {
                this._modifyItem(i, modifiedItem);
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