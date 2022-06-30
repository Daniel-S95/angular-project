const jwt_decode = require('jwt-decode');

function decodeToken(token) {
    let decodedToken = jwt_decode(token);
    return decodedToken;
}

module.exports = {
    decodeToken
}