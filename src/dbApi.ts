import ListItem from "./listItem.d"

const Sequelize = require('sequelize');

export default class todoListDB {
    private sequelize_: any;
    private listTable_: any;

    constructor() {
        this.initDB();
    }

    initDB(): Promise<any> {
        return new Promise(() => {
            this.sequelize_ = new Sequelize('my-db', 'dev', 'secret', {
                host: 'localhost',
                dialect: 'postgres',

                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            }).then(() => {
                this.sequelize_.authenticate()
                    .then(() => (err: any) => {
                        console.log('Connection has been established successfully.');
                    })
                    .catch(() => (err: any) => {
                        console.log('Unable to connect to the database:', err);
                    })
            }).then(() => {
                this.listTable_ = this.sequelize_.define('listTable', {
                    uuid: {
                        type: Sequelize.STRING
                    },
                    title: {
                        type: Sequelize.STRING
                    },
                    done: {
                        type: Sequelize.BOOLEAN
                    },
                }, {
                    freezeTableName: true,
                    timestamps: false
                })
            }).then(() => {
                this.sequelize_
                    .sync({ force: false }).then(() => {
                        console.log("sync success.");
                    }).catch((err: any) => {
                        console.log("sync:" + err);
                    })
            })
        });
    }

    getListAll(): Promise<ListItem[]> {
        let listItemAll: ListItem[] = [];
        return this.listTable_.findAll().then((datas: any) => {
            for (var data of datas) {
                const item: ListItem = { id: data.dataValues.uuid, title: data.dataValues.title, done: data.dataValues.done };
                listItemAll.push(item);
            }
            console.log("GET: " + JSON.stringify(listItemAll));
            return listItemAll;
        });
    }

    addItem(body: any, id: string): Promise<ListItem> {
        return this.listTable_.create({
            uuid: id,
            title: body.title,
            done: false
        }).then((data: any) => {
            let item: ListItem = { id: data.dataValues.uuid, title: data.dataValues.title, done: data.dataValues.done };
            console.log("Add: " + JSON.stringify(item));
            return item;
        });
    };

    deleteItem(targetId: string): Promise<any> {
        return new Promise(this.listTable_.destroy({
            where: { uuid: targetId }
        }).then(() => {
            console.log("Delete: " + targetId);
        }));
    }

    setItemDone(targetId: string, done: any): Promise<any> {
        return new Promise(this.listTable_.update(
            { done: done },
            {
                where: { uuid: targetId }
            }).then(() => {
                console.log("Set: " + JSON.stringify(targetId));
            }));
    }

    searchItem(keyword: string): Promise<ListItem[]> {
        return this.listTable_.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: "%" + keyword + "%"
                }
            }
        }).then((datas: any) => {
            let listItemSearch: ListItem[] = [];
            for (var data of datas) {
                const item: ListItem = { id: data.dataValues.uuid, title: data.dataValues.title, done: data.dataValues.done };
                listItemSearch.push(item);
            }
            console.log("Search[" + keyword + "]:" + JSON.stringify(listItemSearch));
            return listItemSearch;
        });
    }

    resetTable(): Promise<any> {
        return new Promise(this.sequelize_
            .sync({ force: true }).then(() => {
                console.log("sync success.");
            }).catch((err: any) => {
                console.log("sync:" + err);
            }));
    }
}