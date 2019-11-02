import ListItem from "./listItem.d"
import ItemTable from "./itemTable"

import { Sequelize, DataTypes, Op } from "sequelize";

export default class todoListDB {
    private sequelize_: any;

    constructor() {
        const sequelize = new Sequelize('postgres://dev:secret@localhost:5432/my-db');
        this.sequelize_ = sequelize;

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
    }

    async getListAll(): Promise<ListItem[]> {
        let listItemAll: ListItem[] = [];
        let transaction;
        try {
            transaction = await this.sequelize_.transaction();
            const findItems = await ItemTable.findAll({ transaction: transaction });
            for (var findItem of findItems) {
                const item: ListItem = { id: findItem.getDataValue("id"), title: findItem.getDataValue("title"), done: findItem.getDataValue("done") };
                listItemAll.push(item);
            }
            console.log("GET: " + JSON.stringify(listItemAll));
            transaction.commit();
        } catch (err) {
            console.log(err);
            transaction.rollback();
        }
        return listItemAll;
    };

    async addItem(title: string): Promise<ListItem> {
        let item!: ListItem;
        let transaction;
        try {
            transaction = await this.sequelize_.transaction();
            const createItem = await ItemTable.create({
                title: title,
                done: false,
            }, { transaction: transaction });
            item = { id: createItem.getDataValue("id"), title: createItem.getDataValue("title"), done: createItem.getDataValue("done") };
            console.log("Add: " + JSON.stringify(item));
            transaction.commit();
        } catch (err) {
            console.log(err);
            transaction.rollback();
        }
        return item;
    };

    async deleteItem(targetId: number) {
        let transaction;
        try {
            transaction = await this.sequelize_.transaction();
            await ItemTable.destroy({
                where: { id: targetId },
                transaction: transaction
            });
            transaction.commit();
        } catch (err) {
            console.log(err);
            transaction.rollback();
        }
        console.log("Delete: " + targetId);
    }

    async setItemDone(targetId: string, done: any): Promise<any> {
        let transaction;
        try {
            transaction = await this.sequelize_.transaction();
            await ItemTable.update(
                { done: done },
                {
                    where: { uuid: targetId },
                    transaction: transaction
                });
            transaction.commit();
        } catch (err) {
            console.log(err);
            transaction.rollback();
        }
        console.log("Set: " + JSON.stringify(targetId));
    }

    async searchItem(keyword: string): Promise<ListItem[]> {
        let listItemSearch: ListItem[] = [];
        let transaction;
        try {
            transaction = await this.sequelize_.transaction();
            const findItems = await ItemTable.findAll({
                where: {
                    title: {
                        [Op.like]: "%" + keyword + "%"
                    },
                    transaction: transaction
                }
            });
            for (var findItem of findItems) {
                const item: ListItem = { id: findItem.getDataValue("id"), title: findItem.getDataValue("title"), done: findItem.getDataValue("done") };
                listItemSearch.push(item);
            }
            console.log("Search[" + keyword + "]:" + JSON.stringify(listItemSearch));
            transaction.commit();
        } catch (err) {
            console.log(err);
            transaction.rollback();
        }
        return listItemSearch;
    };

    async resetTable() {
        let transaction;
        try {
            transaction = await this.sequelize_.transaction();
            await this.sequelize_.query('DROP TABLE IF EXISTS "listTable" CASCADE', { transaction: transaction });
            await this.sequelize_.query('CREATE TABLE IF NOT EXISTS "listTable" ("id"  SERIAL , "title" VARCHAR(255) NOT NULL, "done" BOOLEAN NOT NULL, PRIMARY KEY ("id"))', { transaction: transaction });
            //            await ItemTable.sync({ force: true });
            transaction.commit();
        } catch (err) {
            console.log(err);
            transaction.rollback();
        }
        console.log("drop and create `ItemTable` as reset");
    }
}
/*
(async () => {
    const dbApi = new todoListDB();
    await dbApi.resetTable();
    await dbApi.getListAll();
})();

(async () => {
    const dbApi = new todoListDB();
    await dbApi.resetTable();
    await dbApi.getListAll();
})();
*/