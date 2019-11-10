import mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: String,
        age: Number
    });

const model = mongoose.model("item", schema);

(async () => {
    mongoose.set('useFindAndModify', false);
    const mongourl = "mongodb://localhost:27017/my-db";
    mongoose.connect(mongourl, { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose
        .connection
        .on("error", () => {
            console.log("MongoDB connection error. Please make sure MongoDB is running.");
            process.exit();
        });
    const add_item = new model({ name: "name11", age: 11 });
    const save_query = await add_item.save().then((result) => { console.log("save:" + JSON.stringify(result)); return result; });
    const findall_query = await model.find({}).exec().then((result) => { console.log("find:" + JSON.stringify(result)); return result; });
    const find_query = await model.find({ name: "name11" }).exec().then((result) => { console.log("findone:" + JSON.stringify(result)); return result; });;
    const update_item = { name: "name11", age: 12 };
    const update_query = await model.findOneAndUpdate({ _id: save_query._id }, { $set: update_item }, { new: true }).exec().then((result) => { console.log("update:" + JSON.stringify(result)); return result; });;
    const remove_query = await model.findOneAndRemove({ name: "name11" }).exec().then((result) => { console.log("removeone:" + JSON.stringify(result)); return result; });;
    await model.deleteMany({}).exec();
})();
