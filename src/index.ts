import express from "express";
import multer from "multer";
import uuidv4 from "uuid/v4";

const app = express();
app.use(multer().none());
app.use(express.static("web"));

const todoList: any[] = [];

app.get("/api/v1/list", (req, res) => {
    res.json(todoList);
});

app.post("/api/v1/add", (req, res) => {
    const todoData = req.body;
    const todoTitle = todoData.title;

    const id = uuidv4();

    const todoItem = {
        id,
        title: todoTitle,
        done: false
    };

    todoList.push(todoItem);

    console.log("Add: " + JSON.stringify(todoItem));

    res.json(todoItem);
});

app.delete("/api/v1/item/:id", (req, res) => {
    const index = todoList.findIndex((item) => item.id === req.params.id);

    if (index >= 0) {
        const deleted = todoList.splice(index, 1); // indexの位置にある項目を削除
        console.log("Delete: " + JSON.stringify(deleted[0]));
    }

    res.sendStatus(200);
});

app.put("/api/v1/item/:id", (req, res) => {
    const index = todoList.findIndex((item) => item.id === req.params.id);

    if (index >= 0) {
        const item = todoList[index];
        if (req.body.done) {
            item.done = req.body.done === "true";
        }
        console.log("Edit: " + JSON.stringify(item));
    }

    res.sendStatus(200);
});

app.listen(3000, () => console.log("Listening on port 3000"));