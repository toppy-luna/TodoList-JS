import { MongoClient } from "mongodb";
import assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true }); // add "{ useUnifiedTopology: true }" because DeprecationWarning

const insertDocuments = function (db: any, callback: any) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err: any, result: any) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function (db: any, callback: any) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({ 'a': 3 }).toArray(function (err: any, docs: any) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

const updateDocument = function (db: any, callback: any) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a: 2 }
        , { $set: { b: 1 } }, function (err: any, result: any) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
}

const removeDocument = function (db: any, callback: any) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a: 3 }, function (err: any, result: any) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function () {
        findDocuments(db, function () {
            updateDocument(db, function () {
                removeDocument(db, function () {
                    client.close();
                });
            });
        });
    });
});

