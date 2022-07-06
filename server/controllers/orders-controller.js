const express = require("express");
const router = express.Router();

const ordersLogic = require("../logic/orders-logic");

router.get("/unavailable-dates", async (request, response) => {
    try {
        const unavailableDates = await ordersLogic.unavailableDates();
        response.json(unavailableDates);
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

router.post("/", async (request, response) => {
    try {
        let orderData = { ...request.body, userToken: request.headers.authorization };
        await ordersLogic.createOrder(orderData);
        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

module.exports = router;