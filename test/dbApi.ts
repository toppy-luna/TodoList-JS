import DBApi from '../src/dbApi';

const assert = require("assert");

describe("dbApiのテスト", () => {
    it("getListAllのテスト", async () => {
        console.log("func1 start");

        const api = new DBApi();
        await api.resetTable();
        await api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
        const addedItem1 = await api.addItem("title1");
        await api.getListAll().then((listItemAll) => assert(JSON.stringify([{ id: addedItem1.id, title: "title1", done: false }]) === JSON.stringify(listItemAll)));
        const addedItem2 = await api.addItem("title2");
        await api.getListAll().then((listItemAll) => assert(JSON.stringify([{ id: addedItem1.id, title: "title1", done: false }, { id: addedItem2.id, title: "title2", done: false }]) === JSON.stringify(listItemAll)));
        await api.closedb();

        console.log("func1 end");
    })

    it("addItemのテスト", async () => {
        console.log("func2 start");

        const api = new DBApi();
        await api.resetTable();
        await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
        await api.addItem("title1").then((addedItem) => assert(JSON.stringify({ id: addedItem.id, title: "title1", done: false }) === JSON.stringify(addedItem)));
        await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
        await api.closedb();

        console.log("func2 end");
    })
    it("deleteItemのテスト", async () => {
        console.log("func3 start");

        const api = new DBApi();
        await api.resetTable();
        await api.getListAll().then((listItemAll) => { console.log(JSON.stringify(listItemAll)); assert(0 === listItemAll.length); return listItemAll; });
        const addedItem = await api.addItem("title1");
        await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
        await api.deleteItem(addedItem.id);
        await api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
        await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
        await api.closedb();

        console.log("func3 end");
    })

    it("searchItemのテスト", async () => {
        console.log("func4 start");

        const api = new DBApi();
        await api.resetTable();
        const addedItem1 = await api.addItem("title1");
        await api.searchItem("title1").then((searchedItem) => assert(JSON.stringify([{ id: addedItem1.id, title: "title1", done: false }]) === JSON.stringify(searchedItem)));
        await api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
        const addedItem2 = await api.addItem("title2");
        await api.searchItem("le1").then((searchedItem) => assert(JSON.stringify([{ id: addedItem1.id, title: "title1", done: false }]) === JSON.stringify(searchedItem)));
        await api.searchItem("title").then((searchedItem) => assert(JSON.stringify([{ id: addedItem1.id, title: "title1", done: false }, { id: addedItem2.id, title: "title2", done: false }]) === JSON.stringify(searchedItem)));
        await api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
        await api.closedb();

        console.log("func4 end");
    })

    it("resetTableのテスト", async () => {
        console.log("func5 start");

        const api = new DBApi();
        await api.resetTable();
        await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
        await api.addItem("title1");
        await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
        await api.addItem("title2");
        await api.getListAll().then((listItemAll) => assert(2 === listItemAll.length));
        await api.resetTable();
        await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
        await api.closedb();

        console.log("func5 end");
    })
})
