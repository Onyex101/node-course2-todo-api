const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
// var message = 'i am user 3';
// var hash = SHA256(message).toString();
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

var data = {
    id: 4
};
var token = jwt.sign(data, '123abc');
console.log('token: ', token);
var decode = jwt.verify(token, '123abc');
console.log('decoded: ', decode);

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// var reshash = SHA256(JSON.stringify(data) + 'somesecret').toString();
// if (reshash === token.hash) {
//     console.log('data was not changed');
// } else {
//     console.log('data was changed, do not trust');
// };

