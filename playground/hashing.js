const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// var message = 'i am user 3';
// var hash = SHA256(message).toString();
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

var data = {
    _id: 4
};
var token = jwt.sign(data, '123abc');
console.log('token: ', token);
var decode = jwt.verify(token, '123abc');
console.log('decoded: ', decode);

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// var rehash = SHA256(JSON.stringify(data) + 'somesecret').toString();
// if (rehash === token.hash) {
//     console.log('data was not changed');
// } else {
//     console.log('data was changed, do not trust');
// };

// var password = '123abc';
// bcrypt.genSalt(10, (err, salt) => {
//    bcrypt.hash(password, salt, (err, hash) => {
//     console.log('hash', hash);
//    });
// });
// var hashpassword = '$2a$10$xvavpyawCmcn6lkSexnSGeahoUQij0oLwPqTjyp3HJolrS4gmPdU6';
// bcrypt.compare(password, hashpassword, (err, res) => {
//     console.log(res);
// });