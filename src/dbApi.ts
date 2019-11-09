import ListItem from "./listItem.d"
import ItemTable from "./itemTable"

import mongoose = require("mongoose");

export default class todoListDB {
    constructor() {
        const env = process.env.NODE_ENV || 'development';
        const connectionURI: string = "mongodb://localhost:27017/" + env + "-db";
        mongoose.set('useFindAndModify', false);
        mongoose.connect(connectionURI, { useUnifiedTopology: true, useNewUrlParser: true });
        mongoose
            .connection
            .on("error", () => {
                console.log("MongoDB connection error. Please make sure MongoDB is running.");
                process.exit();
            });
    }
    async closedb() {
        await mongoose.disconnect();
    }

    async getListAll(): Promise<ListItem[]> {
        const findItems = await ItemTable.find({}).exec().then((result: any) => { console.log("find:" + JSON.stringify(result)); return result; });
        let listItemSearch: ListItem[] = [];
        for (var findItem of findItems) {
            const item: ListItem = { id: findItem._id, title: findItem.title, done: findItem.done };
            listItemSearch.push(item);
        }
        console.log("GET: " + JSON.stringify(listItemSearch));
        return listItemSearch;
    };

    async addItem(title: string): Promise<ListItem> {
        const addItem = new ItemTable({ title: title, done: false });
        const save = await addItem.save().then((result: any) => { console.log("save:" + JSON.stringify(result)); return result; });
        const item: ListItem = { id: save._id, title: save.title, done: save.done };
        console.log("Add: " + JSON.stringify(item));
        return item;
    };

    async deleteItem(targetId: string) {
        await ItemTable.findOneAndRemove({ _id: targetId }).exec().then((result: any) => { console.log("removeone:" + JSON.stringify(result)); return result; });;
        console.log("Delete: " + targetId);
    }

    async setItemDone(targetId: string, done: any): Promise<any> {
        const update_item = { done: done };
        await ItemTable.findOneAndUpdate({ _id: targetId }, { $set: update_item }, { new: true }).exec().then((result: any) => { console.log("update:" + JSON.stringify(result)); return result; });;
        console.log("Set: " + JSON.stringify(targetId));
    }

    async searchItem(keyword: string): Promise<ListItem[]> {
        const findItems = await ItemTable.find({ title: RegExp(keyword, "i") }).exec().then((result: any) => { console.log("findone:" + JSON.stringify(result)); return result; });;
        let listItemSearch: ListItem[] = [];
        for (var findItem of findItems) {
            const item: ListItem = { id: findItem._id, title: findItem.title, done: findItem.done };
            listItemSearch.push(item);
        }
        console.log("Search[" + keyword + "]:" + JSON.stringify(listItemSearch));
        return listItemSearch;
    };

    async resetTable() {
        await ItemTable.deleteMany({}).exec().then((result: any) => { console.log("removeall:" + JSON.stringify(result)); });
    }
}
