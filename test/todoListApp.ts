import TodoListApp from '../src/todoListApp';
import ListItem from '../src/listItem.d'

const assert = require("assert");

describe("TodoListAppのテスト", () => {
    it("getListAllのテスト", () => {
        const todoListApp = new TodoListApp();
        assert(JSON.stringify([]) === JSON.stringify(todoListApp.getListAll()));
        todoListApp.addItem({ body: "body1", title: "title1" }, "id1");
        assert(JSON.stringify([{ id: "id1", title: "title1", done: false }]) === JSON.stringify(todoListApp.getListAll()));
        todoListApp.addItem({ body: "body2", title: "title2" }, "id2");
    })

    it("addItemのテスト", () => {
        const todoListApp = new TodoListApp();
        assert(0 === todoListApp.getListAll().length);
        const addedItem = todoListApp.addItem({ body: "body1", title: "title1" }, "id1");
        assert(JSON.stringify({ id: "id1", title: "title1", done: false }) === JSON.stringify(addedItem));
        assert(1 === todoListApp.getListAll().length);
    })

    it("deleteItemのテスト", () => {
        const todoListApp = new TodoListApp();
        assert(0 === todoListApp.getListAll().length);
        todoListApp.addItem({ body: "body1", title: "title1" }, "id1");
        assert(1 === todoListApp.getListAll().length);
        todoListApp.deleteItem("id1");
        const items: ListItem[] = todoListApp.getListAll();
        assert(JSON.stringify([]) === JSON.stringify(items));
        assert(0 === items.length);
    })
})
