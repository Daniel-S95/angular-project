const express = require("express");
const router = express.Router();

const cartsLogic = require("../logic/carts-logic");

router.post("/", async (request, response) => {
    try {
        let { userId } = request.body;
        const cartId = await cartsLogic.createCart(userId);
        response.json(cartId);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.delete("/:cartId", async (request, response) => {
    try {
        let cartId = request.params.cartId;
        await cartsLogic.deleteCart(cartId);
        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/:cartId", async (request, response) => {
    try {
        let cartId = request.params.cartId;
        const cartItems = await cartsLogic.getCartItems(cartId);
        response.json(cartItems);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.post("/item", async (request, response) => {
    try {
        let { productId, quantity, cartId } = request.body;
        let cartData = { productId, quantity, cartId };
        await cartsLogic.addProductToCart(cartData);
        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.put("/:cartId", async (request, response) => {
    try {
        let cartId = +request.params.cartId;
        let cartData = {...request.body, cartId};

        await cartsLogic.updateCartItemQuantity(cartData);
        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.delete("/item/:cartItemId", async (request, response) => {
    try {
        let cartItemId = request.params.cartItemId;
        await cartsLogic.deleteCartItem(cartItemId);
        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;