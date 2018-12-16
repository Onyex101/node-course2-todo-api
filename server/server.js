require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

/**
 * private route
 * creates new todos
 */
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

/**
 * private route
 * get all todos
 */
app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator: req.user._id}).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        };
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

/**
 * private route
 * delete a todo
 */
app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({
            status: 404,
            message: 'invalid id'
        });
    };
    Todo.findOneAndDelete({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send({
                message: 'no id',
                status: 404
            });
        };
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

/**
 * private route
 * update a todo
 */
app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    };
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        };
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * public route
 * Signup new user
 */
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send({e});
    });
});

/**
 * public route
 * login users if exist
 */
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send('error');
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

/**
 * log out user
 * delete generated token from db
 */
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then((ret) => {
        res.status(200).send(ret);
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`started up at port ${port}`);
});

module.exports = {app};