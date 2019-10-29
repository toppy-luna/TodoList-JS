import express from "express";
import multer from "multer";
import uuidv4 from "uuid/v4";
import ListItem from "./listItem.d"

const Sequelize = require('sequelize');

const sequelize = new Sequelize('my-db', 'dev', 'secret', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => (err: any) => {
        console.log('Connection has been established successfully.');
    })
    .catch(() => (err: any) => {
        console.log('Unable to connect to the database:', err);
    });

var listTable = sequelize.define('listTable', {
    uuid: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    done: {
        type: Sequelize.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false
});

sequelize
    .sync({ force: false }).then(() => {
        console.log("sync success.");
    }).catch((err: any) => {
        console.log("sync:" + err);
    });

const app = express();
app.use(multer().none());
app.use(express.static("web"));

app.get("/api/v1/list/", (req, res) => {
    let listItemAll: ListItem[] = [];
    listTable.findAll().then((datas: any) => {
        for (var data of datas) {
            const item: ListItem = { id: data.dataValues.uuid, title: data.dataValues.title, done: data.dataValues.done };
            listItemAll.push(item);
            console.log("find: " + JSON.stringify(item));
        }
        console.log("Success /api/v1/list/");
        //        res.sendStatus(200);
        res.json(listItemAll);
    }).catch((err: any) => {
        console.log("Failed /api/v1/list/:" + err);
        res.sendStatus(500);
    });
});

app.post("/api/v1/add", (req, res) => {
    listTable.create({
        uuid: uuidv4(),
        title: req.body.title,
        done: false
    }).then((data: any) => {
        let item: ListItem = { id: data.dataValues.uuid, title: data.dataValues.title, done: data.dataValues.done };
        console.log("Success: /api/v1/add" + JSON.stringify(item));
        //        res.sendStatus(200);
        res.json(item);
    }).catch((err: any) => {
        console.log("Failed /api/v1/add/:" + err);
        res.sendStatus(500);
    });
});

app.delete("/api/v1/item/:id", (req, res) => {
    listTable.destroy({
        where: { uuid: req.params.id }
    }).then(() => {
        res.sendStatus(200);
    }).catch((err: any) => {
        console.log("Failed /api/v1/item/:id:" + err);
        res.sendStatus(500);
    });
});

app.put("/api/v1/item/:id", (req, res) => {
    listTable.update(
        { done: req.body.done },
        {
            where: { uuid: req.params.id }
        }).then(() => {
            res.sendStatus(200);
        }).catch((err: any) => {
            console.log("Failed /api/v1/item/:id:" + err);
            res.sendStatus(500);
        });
});

app.get("/api/v1/list/:keyword", (req, res) => {
    listTable.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: "%" + req.params.keyword + "%"
            }
        }
    }).then((datas: any) => {
        let listItemSearch: ListItem[] = [];
        for (var data of datas) {
            const item: ListItem = { id: data.dataValues.uuid, title: data.dataValues.title, done: data.dataValues.done };
            listItemSearch.push(item);
            console.log("find: " + JSON.stringify(item));
        }
        console.log("Success /api/v1/list/");
        //        res.sendStatus(200);
        res.json(listItemSearch);
    }).catch((err: any) => {
        console.log("Failed /api/v1/list/:keyword:" + err);
        res.sendStatus(500);
    });
});

app.listen(3001, () => console.log("Listening on port 3001"));