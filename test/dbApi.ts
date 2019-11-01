import DBApi from '../src/dbApi';

const assert = require("assert");

describe("TodoListAppのテスト", () => {
    it("getListAllのテスト", () => {
        (async () => {
            const api = new DBApi();
            api.resetTable();
            api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
            api.addItem("title1");
            api.getListAll().then((listItemAll) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }]) === JSON.stringify(listItemAll)));
            api.addItem("title2");
            api.getListAll().then((listItemAll) => assert(JSON.stringify([{ id: 2, title: "title2", done: false }]) === JSON.stringify(listItemAll)));
        })
    })
    it("addItemのテスト", () => {
        (async () => {
            const api = new DBApi();
            api.resetTable();
            api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
            api.addItem("title1").then((addedItem) => assert(JSON.stringify({ id: 1, title: "title1", done: false }) === JSON.stringify(addedItem)));
            api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
        })
    })

    it("deleteItemのテスト", () => {
        (async () => {
            const api = new DBApi();
            api.resetTable();
            api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
            api.addItem("title1");
            api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
            api.deleteItem(1);
            api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
            api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
        })
    })

    it("searchItemのテスト", () => {
        (async () => {
            const api = new DBApi();
            api.resetTable();
            api.addItem("title1");
            api.searchItem("title1").then((searchedItem) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }]) === JSON.stringify(searchedItem)));
            api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
            api.addItem("title2");
            api.searchItem("le1").then((searchedItem) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }]) === JSON.stringify(searchedItem)));
            api.searchItem("title").then((searchedItem) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }, { id: 2, title: "title2", done: false }]) === JSON.stringify(searchedItem)));
            api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
        })
    })

    it("resetTableのテスト", () => {
        (async () => {
            const api = new DBApi();
            api.resetTable();
            api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
            api.addItem("title1");
            api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
            api.addItem("title1");
            api.getListAll().then((listItemAll) => assert(2 === listItemAll.length));
            api.resetTable();
            api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
        })
    })
})
