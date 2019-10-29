import express from "express";
import multer from "multer";
import uuidv4 from "uuid/v4";
import todoListApp from "./dbApi";

const app = express();
app.use(multer().none());
app.use(express.static("web"));

const api = new todoListApp();

app.get("/api/v1/list/", (req, res) => {
    api.getListAll().then((listItemAll) => res.json(listItemAll));
});

app.post("/api/v1/add", (req, res) => {
    api.addItem(req.body, uuidv4()).then((addItem) => res.json(addItem));
});

app.delete("/api/v1/item/:id", (req, res) => {
    api.deleteItem(req.params.id);
    res.sendStatus(200);
});

app.put("/api/v1/item/:id", (req, res) => {
    api.setItemDone(req.params.id, req.body.done);
    res.sendStatus(200);
});

app.get("/api/v1/list/:keyword", (req, res) => {
    api.searchItem(req.params.keyword).then((searchItem) => res.json(searchItem));
});

app.listen(3000, () => console.log("Listening on port 3000"));