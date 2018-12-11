//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log('ObjectID',obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
    console.log("Connected correctly to server");

    // client.db().collection('Todos').deleteMany({test: 'something to do'}).then((res) => {
    //     console.log(res);
    // });
    // client.db().collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // })
    client.db().collection('Users').findOneAndDelete({_id: new ObjectID("5c0f25d3f5ad9604488696f9")})
        .then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
        });
    client.close();
});