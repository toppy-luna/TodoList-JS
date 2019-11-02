import ListItem from "./listItem.d"
import ItemTable from "./itemTable"

import { Sequelize, DataTypes, Op } from "sequelize";

export default class todoListDB {
    constructor() {
        const env = process.env.NODE_ENV || 'development';
        const config = require(__dirname + '/../config/config.json')[env];

        let connectionURI: string;
        if (config) {
            connectionURI = config.dialect + "://" + config.username + ":" + config.password + "@" + config.host + ":5432/" + config.database;
        } else {
            connectionURI = "postgres://dev:secret@localhost:5432/my-db";
        }

        const sequelize = new Sequelize(connectionURI);

        ItemTable.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }
        }, {
            sequelize,
            tableName: 'listTable',
            freezeTableName: true,
            timestamps: false
        });

        ItemTable.sync({ force: false });
    }

    async getListAll(): Promise<ListItem[]> {
        const findItems = await ItemTable.findAll();
        let listItemAll: ListItem[] = [];
        for (var findItem of findItems) {
            const item: ListItem = { id: findItem.getDataValue("id"), title: findItem.getDataValue("title"), done: findItem.getDataValue("done") };
            listItemAll.push(item);
        }
        console.log("GET: " + JSON.stringify(listItemAll));
        return listItemAll;
    };

    async addItem(title: string): Promise<ListItem> {
        const createItem = await ItemTable.create({
            title: title,
            done: false,
        });
        const item: ListItem = { id: createItem.getDataValue("id"), title: createItem.getDataValue("title"), done: createItem.getDataValue("done") };
        console.log("Add: " + JSON.stringify(item));
        return item;
    };

    async deleteItem(targetId: number) {
        await ItemTable.destroy({
            where: { id: targetId }
        });
        console.log("Delete: " + targetId);
    }

    async setItemDone(targetId: string, done: any): Promise<any> {
        await ItemTable.update(
            { done: done },
            {
                where: { uuid: targetId }
            });
        console.log("Set: " + JSON.stringify(targetId));
    }

    async searchItem(keyword: string): Promise<ListItem[]> {
        const findItems = await ItemTable.findAll({
            where: {
                title: {
                    [Op.like]: "%" + keyword + "%"
                }
            }
        });
        let listItemSearch: ListItem[] = [];
        for (var findItem of findItems) {
            const item: ListItem = { id: findItem.getDataValue("id"), title: findItem.getDataValue("title"), done: findItem.getDataValue("done") };
            listItemSearch.push(item);
        }
        console.log("Search[" + keyword + "]:" + JSON.stringify(listItemSearch));
        return listItemSearch;
    };

    async resetTable() {
        await ItemTable.sync({ force: true });
        console.log("drop and create `ItemTable` as reset");
    }
}
