import DBApi from '../src/dbApi';

const assert = require("assert");

describe("TodoListAppのテスト", () => {
    it("getListAllのテスト", () => {
        (async () => {
            const api = new DBApi();
            await api.resetTable();
            await api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
            await api.addItem({ body: "body1", title: "title1" }, "id1");
            await api.getListAll().then((listItemAll) => assert(JSON.stringify([{ id: "id1", title: "title1", done: false }]) === JSON.stringify(listItemAll)));
            await api.addItem({ body: "body2", title: "title2" }, "id2");
        })();
    })

    it("addItemのテスト", () => {
        (async () => {
            const api = new DBApi();
            await api.resetTable();
            await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
            await api.addItem({ body: "body1", title: "title1" }, "id1").then((addedItem) => assert(JSON.stringify({ id: "id1", title: "title1", done: false }) === JSON.stringify(addedItem)));
            await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
        })();
    })

    it("deleteItemのテスト", () => {
        (async () => {
            const api = new DBApi();
            await api.resetTable();
            await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
            await api.addItem({ body: "body1", title: "title1" }, "id1");
            await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
            await api.deleteItem("id1");
            await api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
            await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
        })();
    })

    it("searchItemのテスト", () => {
        (async () => {
            const api = new DBApi();
            await api.resetTable();
            await api.addItem({ body: "body1", title: "title1" }, "id1");
            await api.searchItem("title1").then((searchedItem) => assert(JSON.stringify([{ id: "id1", title: "title1", done: false }]) === JSON.stringify(searchedItem)));
            await api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
            await api.addItem({ body: "body2", title: "title2" }, "id2");
            await api.searchItem("le1").then((searchedItem) => assert(JSON.stringify([{ id: "id1", title: "title1", done: false }]) === JSON.stringify(searchedItem)));
            await api.searchItem("title").then((searchedItem) => assert(JSON.stringify([{ id: "id1", title: "title1", done: false }, { id: "id2", title: "title2", done: false }]) === JSON.stringify(searchedItem)));
            await api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
        })();
    })
})
