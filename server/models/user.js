const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {ObjectID} = require('mongodb');
const jwt_key = process.env.JWT_SECRET;
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            massage: '{value} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, jwt_key).toString();
    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

userSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, jwt_key);
    } catch(e) {
        return Promise.reject(e);
    };
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

userSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        };
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                };
            });
        });
    });
};

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('user', userSchema);

module.exports = {User};