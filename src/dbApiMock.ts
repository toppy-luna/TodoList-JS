import ListItem from "./listItem.d"

import { DataTypes, Op } from "sequelize";
var SequelizeMock = require('sequelize-mock');

export default class todoListDB {
    private ItemTable: any;
    constructor() {
        const sequelize = new SequelizeMock();
        this.ItemTable = sequelize.define('listTable', {
            id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            done: DataTypes.BOOLEAN
        }, {
            freezeTableName: true,
            timestamps: false
        });
    }

    async getListAll(): Promise<ListItem[]> {
        const findItems = await this.ItemTable.findAll();
        let listItemAll: ListItem[] = [];
        for (var findItem of findItems) {
            const item: ListItem = { id: findItem.dataValues.id, title: findItem.dataValues.title, done: findItem.dataValues.done };
            listItemAll.push(item);
        }
        console.log("GET: " + JSON.stringify(listItemAll));
        return listItemAll;
    };

    async addItem(title: string): Promise<ListItem> {
        const createItem = await this.ItemTable.create({
            title: title,
            done: false,
        });
        const item: ListItem = { id: createItem.dataValues.id, title: createItem.dataValues.title, done: createItem.dataValues.done };
        console.log("Add: " + JSON.stringify(item));
        return item;
    };

    async deleteItem(targetId: number) {
        await this.ItemTable.destroy({
            where: { id: targetId }
        });
        console.log("Delete: " + targetId);
    }

    async setItemDone(targetId: string, done: any): Promise<any> {
        await this.ItemTable.update(
            { done: done },
            {
                where: { uuid: targetId }
            });
        console.log("Set: " + JSON.stringify(targetId));
    }

    async searchItem(keyword: string): Promise<ListItem[]> {
        const findItems = await this.ItemTable.findAll({
            where: {
                title: {
                    [Op.like]: "%" + keyword + "%"
                }
            }
        });
        let listItemSearch: ListItem[] = [];
        for (var findItem of findItems) {
            const item: ListItem = { id: findItem.dataValues.id, title: findItem.dataValues.title, done: findItem.dataValues.done };
            listItemSearch.push(item);
        }
        console.log("Search[" + keyword + "]:" + JSON.stringify(listItemSearch));
        return listItemSearch;
    };

    async resetTable() {
        await this.ItemTable.sync({ force: true });
        console.log("drop and create `ItemTable` as reset");
    }
}
