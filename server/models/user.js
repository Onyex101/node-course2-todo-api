var mongoose = require('mongoose');

var User = mongoose.model('user', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1
    }
});

module.exports = {User};