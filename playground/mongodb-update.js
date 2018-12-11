//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log('ObjectID',obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
    console.log("Connected correctly to server");

    // client.db().collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5c0f7f1615e7a19dd5684442")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // })
    //     .then((res) => {
    //         console.log(JSON.stringify(res, undefined, 2));
    //     });
    client.db().collection('Users').findOneAndUpdate({
        _id: new ObjectID("5c0f821115e7a19dd568449c")
    }, {
        $set: {
            name: "onyeka"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    })
        .then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
        });
    client.close();
});