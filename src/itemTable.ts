import mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: String,
    title: String,
    done: Boolean
});
const ItemTable = mongoose.model("item", schema);
export default ItemTable;
