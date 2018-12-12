const mongoose = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = "5c0fb352f347240050015205";

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos', todos);
// });

// Todo.findOne({_id: id}).then((todo) => {
//     console.log('todo', todo);
// });

// Todo.findById(id).then((todoId) => {
//     if (!todoId) {return console.log('Id not found')};
//     console.log(todoId);
// });

User.findById(id).then((user) => {
    if(!user) {
        return console.log('no user found');
    };
    console.log(user);
})