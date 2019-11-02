import dbApi from "./dbApi";

const db = new dbApi();
db.connect();
db.select();
db.end();
