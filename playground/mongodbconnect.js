//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log('ObjectID',obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
    console.log("Connected correctly to server");

    // client.db().collection('Todos')
    //     .insertOne({
    //         test: 'something to do',
    //         completed: false
    //     }, (err, res) => {
    //         if (err) {
    //             return console.log('unable to insert todo', err);
    //         }
    //         console.log(JSON.stringify(res.ops, undefined, 2));
    //     });

    client.db().collection('Users')
        .insertOne({
            name: 'Onyeka',
            location: 'lagos',
            age: 21
        }, (err, res) => {
            if (err) {
                return console.log('unable to insert users', err);
            }
            console.log(JSON.stringify(res.ops[0], undefined, 2));
        });
    client.close();
});