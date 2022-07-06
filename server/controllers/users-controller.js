const express = require("express");
const router = express.Router();

const usersLogic = require("../logic/users-logic");

router.post("/", async (request, response) => {
    let userRegistrationData = request.body;

    try {
        let userRegistrationDataLength = Object.keys(userRegistrationData).length;

        if (userRegistrationDataLength === 7) {
            await usersLogic.addUser(userRegistrationData);
        } else if (userRegistrationDataLength === 2) {
            await usersLogic.emailAndIdNumberUnique(userRegistrationData);
        }

        response.json();
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

router.post("/login", async (request, response) => {
    let userLoginData = request.body;

    try {
        let successfulLoginResponse = await usersLogic.userLogin(userLoginData);
        response.json(successfulLoginResponse);
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

router.get("/:userId", async (request, response) => {
    try {
        let userId = request.params.userId;
        const userData = await usersLogic.getUserData(userId);
        response.json(userData);
    }

    catch (e) {
        console.error(e);
        response.status(500).send(e.message);
    }
});

module.exports = router;