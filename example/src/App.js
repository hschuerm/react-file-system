import React, { Component } from 'react';
import ReactFileSystem from 'react-file-system';

import 'moment/locale/de';

import './styles/index';

const rootFolder = [
    {
        "name": "components",
        "items": []
    },
    {
        "name": "zweiter ordner hier",
        "link": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    },
    {
        "name": "test",
        "items": []
    },
    {
        "name": "erster ordner hier",
        "link": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    },
    {
        "name": "erster ordner hier 23er",
        "link": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    },
    {
        "name": "erster ordner hier 2e323e",
        "link": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "erster ordner hier d23da",
        "link": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "erster ordner hier cqec",
        "link": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    },
    {
        "name": "erster ordner hierwxaxw",
        "link": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    },
    {
        "name": "erster ordner hierwqd  ",
        "link": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "erster ordner hiercewc",
        "link": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "erster ordner hieraxax",
        "link": "http://files.vfl-schwimmen.de/104"
    }
];

const test = [
    {
        "name": "test",
        "items": []
    },
    {
        "name": "erster ordner hier",
        "items": []
    }
];

const first = [
    {
        "name": "erste json datei.json",
        "link": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "erster ordner hier",
        "items": []
    },
    {
        "name": "Bild id -> 104",
        "link": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    }
];

const second = [
    {
        "name": "zweite json datei.json",
        "link": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "zweiter ordner hier",
        "items": []
    },
    {
        "name": "Bild id -> 104",
        "link": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    }
];


const DataProvider = function (path) {
    return new Promise(function (resolve, rejcet) {
        setTimeout(() => {
            switch (path) {
                case "Dateiablage/":
                    resolve(rootFolder);
                    break;
                case "Dateiablage/components/":
                    resolve(test);
                    break;
                case "Dateiablage/test/":
                    resolve(test);
                    break;
                case "Dateiablage/components/test/":
                    resolve(first);
                    break;
                case "Dateiablage/test/test/":
                    resolve(second);
                    break;

                default: rejcet("404: path not found")
            }
        }, 1);
    });
};

export default class App extends Component {
    constructor() {
        super();

        this.currFolder = null;
        this.val = null;
    }

    setCurrFolder(folder) {
        this.currFolder = folder;
        this.currFolder.onContextMenu = (evt, item) => {
            this.currFolder.removeItemByName(item.name);
        };
        this.currFolder.onError = (err) => {
            console.error(err);
        };
    }

    onClick() {
        this.currFolder.addItem({
            name: this.val,
            updatedAt: new Date()
        });
    }

    onClick2(asc = true) {
        this.currFolder.sortItems("name", asc);
    }

    onFolderSwitched(folder) {
        this.setCurrFolder.call(this, folder);
        DataProvider(folder.getPath())
            .then(res => {
                folder.onItemsLoaded(res);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="container">
                <input onChange={evt => this.val = evt.target.value} />
                <button onClick={this.onClick.bind(this)}>add</button>
                <button onClick={this.onClick2.bind(this)}>sort asc</button>
                <button onClick={this.onClick2.bind(this, false)}>sort desc</button>
                <ReactFileSystem
                    display="animated"
                    rootFolderName="Dateiablage"
                    onRootFolderReady={this.onFolderSwitched.bind(this)}
                    onFolderSwitched={this.onFolderSwitched.bind(this)} />
            </div>
        );
    }
}
