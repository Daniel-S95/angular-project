const express = require("express");
const router = express.Router();

const categoriesLogic = require("../logic/categories-logic");

router.get("/", async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategories();

        response.json(categories);
    }

    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;