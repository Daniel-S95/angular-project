const expressJwt = require("express-jwt");
const config = require("../config/config.json");
const { secret } = config;

function loginFilter() {
    return expressJwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            { url: "/api/users", method: "POST" },
            { url: "/api/users/login", method: "POST" },
            { url: "/api/products/stats", method: "GET" },
        ]
    });
};

module.exports = loginFilter;