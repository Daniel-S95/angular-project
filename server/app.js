const express = require("express");
const cors = require("cors");
const server = express();
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const categoriesController = require("./controllers/categories-controller");
const cartsController = require("./controllers/carts-controller");
const ordersController = require("./controllers/orders-controller");
const loginFilter = require("./middleware/login-filter");

server.use(cors({ origin: "http://localhost:4200" }));

server.use(loginFilter());

server.use(express.json());

server.use("/api/users", usersController);
server.use("/api/products", productsController);
server.use("/api/categories", categoriesController);
server.use("/api/carts", cartsController);
server.use("/api/orders", ordersController);

server.listen(3001, () => { console.log("Listening on http://localhost:3001") });