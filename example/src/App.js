import React, { Component } from 'react';
import ReactFileSystem from 'react-file-system';

import './styles/index';

const rootFolder = [
    {
        "name": "components",
        "items": []
    },
    {
        "name": "zweiter ordner hier",
        "src": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date(),
        "size": 55
    },
    {
        "name": "test",
        "items": [],
        "size": 4096
    },
    {
        "name": "erster ordner hier",
        "src": "http://files.vfl-schwimmen.de/104",
        "mimeType": "image/gif",
        "updatedAt": new Date(),
        "size": 43500000
    },
    {
        "name": "erster ordner hier 23er",
        "src": "http://files.vfl-schwimmen.de/104",
        "mimeType": "text/html",
        "updatedAt": new Date(),
        "size": 432343500000
    },
    {
        "name": "erster ordner hier 2e323e",
        "src": "http://files.vfl-schwimmen.de/104",
        "mimeType": "application/test"
    },
    {
        "name": "erster ordner hier d23da",
        "src": "http://files.vfl-schwimmen.de/104",
        "mimeType": "text/plain"
    },
    {
        "name": "erster ordner hier cqec",
        "src": "http://files.vfl-schwimmen.de/104",
        "mimeType": "video/gif",
        "updatedAt": new Date()
    },
    {
        "name": "erster ordner hierwxaxw",
        "src": "http://files.vfl-schwimmen.de/104",
        "mimeType": "audio/gif",
        "updatedAt": new Date()
    },
    {
        "name": "erster ordner hierwqd  ",
        "src": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "erster ordner hiercewc",
        "src": "http://files.vfl-schwimmen.de/104",
        "mimeType": "application/pdf"
    },
    {
        "name": "erster ordner hieraxax",
        "src": "http://files.vfl-schwimmen.de/104"
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
        "src": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "erster ordner hier",
        "items": []
    },
    {
        "name": "Bild id -> 104",
        "src": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    }
];

const second = [
    {
        "name": "zweite json datei.json",
        "src": "http://files.vfl-schwimmen.de/104"
    },
    {
        "name": "zweiter ordner hier",
        "items": []
    },
    {
        "name": "Bild id -> 104",
        "src": "http://files.vfl-schwimmen.de/104",
        "updatedAt": new Date()
    }
];


const DataProvider = function (path) {
    // eslint-disable-next-line
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

                default: rejcet("404: path not found");
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
            this.currFolder.rename(item.name)
                .then(name => console.log(name))
                .catch(err => console.error(err));
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
                    local="de"
                    onRootFolderReady={this.onFolderSwitched.bind(this)}
                    onFolderSwitched={this.onFolderSwitched.bind(this)}
                    onItemSelected={item => console.log(item)} />
            </div>
        );
    }
}
