import express from "express";
import multer from "multer";
import uuidv4 from "uuid/v4";
import * as todoListApp from "./todoListApp";

const app = express();
app.use(multer().none());
app.use(express.static("web"));

const api = new todoListApp.TodoListApp();

app.get("/api/v1/list/", (req, res) => {
    res.json(api.getListAll());
});

app.post("/api/v1/add", (req, res) => {
    res.json(api.addItem(req.body, uuidv4()));
});

app.delete("/api/v1/item/:id", (req, res) => {
    api.deleteItem(req.params.id);
    res.sendStatus(200);
});

app.put("/api/v1/item/:id", (req, res) => {
    api.setItemDone(req.params.id, req.body.done);
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Listening on port 3000"));