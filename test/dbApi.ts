//import DBApi from '../src/dbApi';
import DBApi from '../src/dbApiMock';

const assert = require("assert");

describe("dbApiのテスト", () => {
    it("getListAllのテスト", () => {
        (async () => {
            try {
                const api = new DBApi();
                await api.resetTable();
                await api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
                await api.addItem("title1");
                await api.getListAll().then((listItemAll) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }]) === JSON.stringify(listItemAll)));
                await api.addItem("title2");
                await api.getListAll().then((listItemAll) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }, { id: 2, title: "title2", done: false }]) === JSON.stringify(listItemAll)));
            } catch (err) {
                console.log(err);
            }
        })();
    })

    it("addItemのテスト", () => {
        (async () => {
            try {
                const api = new DBApi();
                await api.resetTable();
                await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
                await api.addItem("title1").then((addedItem) => assert(JSON.stringify({ id: 1, title: "title1", done: false }) === JSON.stringify(addedItem)));
                await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
            } catch (err) {
                console.log(err);
            }
        })();
    })
    it("deleteItemのテスト", () => {
        (async () => {
            try {
                const api = new DBApi();
                await api.resetTable();
                await api.getListAll().then((listItemAll) => { console.log(JSON.stringify(listItemAll)); assert(0 === listItemAll.length) });
                await api.addItem("title1");
                await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
                await api.deleteItem(1);
                await api.getListAll().then((listItemAll) => assert(JSON.stringify([]) === JSON.stringify(listItemAll)));
                await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
            } catch (err) {
                console.log(err);
            }
        })();
    })

    it("searchItemのテスト", () => {
        (async () => {
            try {
                const api = new DBApi();
                await api.resetTable();
                await api.addItem("title1");
                await api.searchItem("title1").then((searchedItem) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }]) === JSON.stringify(searchedItem)));
                await api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
                await api.addItem("title2");
                await api.searchItem("le1").then((searchedItem) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }]) === JSON.stringify(searchedItem)));
                await api.searchItem("title").then((searchedItem) => assert(JSON.stringify([{ id: 1, title: "title1", done: false }, { id: 2, title: "title2", done: false }]) === JSON.stringify(searchedItem)));
                await api.searchItem("invalidTitle").then((searchedItem) => assert(JSON.stringify([]) === JSON.stringify(searchedItem)));
            } catch (err) {
                console.log(err);
            }
        })();
    })

    it("resetTableのテスト", () => {
        (async () => {
            try {
                const api = new DBApi();
                await api.resetTable();
                await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
                await api.addItem("title1");
                await api.getListAll().then((listItemAll) => assert(1 === listItemAll.length));
                await api.addItem("title2");
                await api.getListAll().then((listItemAll) => assert(3 === listItemAll.length));
                await api.resetTable();
                await api.getListAll().then((listItemAll) => assert(0 === listItemAll.length));
            } catch (err) {
                console.log(err);
            }
        })();
    })
})
