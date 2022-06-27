const express = require("express");
const router = express.Router();

const productsLogic = require("../logic/products-logic");

router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/stats", async (request, response) => {
    try {
        const statsArray = await productsLogic.getStats();
        let [stats] = statsArray;
        response.json(stats);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/:productId", async (request, response) => {
    try {
        let productId = request.params.productId;
        const productData = await productsLogic.getProductData(productId);

        response.json(productData);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/name/:productSubstringName", async (request, response) => {
    try {
        const substring = request.params.productSubstringName;
        const productsBySubstring = await productsLogic.getProductsBySubstring(substring);
        response.json(productsBySubstring);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/category/:categoryId", async (request, response) => {
    try {
        let categoryId = request.params.categoryId;
        const productsOfCategory = await productsLogic.getProductsByCategoryId(categoryId);

        response.json(productsOfCategory);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.post("/", async (request, response) => {
    try {
        let productData = request.body;
        await productsLogic.addProduct(productData);
        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.put("/:productId", async (request, response) => {
    try {
        let newProductData = request.body;
        await productsLogic.updateProduct(newProductData);

        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;