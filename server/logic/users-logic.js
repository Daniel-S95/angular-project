const usersDal = require('../dal/users-dal');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const isIsraeliIdValid = require('israeli-id-validator');
const isEmalValid = require('is-valid-email');

async function addUser(userRegistrationData) {
    await emailAndIdNumberUnique(userRegistrationData);
    validateRegisterUserData(userRegistrationData);

    userRegistrationData.password = encryptPassword(userRegistrationData.password);
    await usersDal.addUser(userRegistrationData);
}

async function emailAndIdNumberUnique(userData) {
    if (await usersDal.isUserExistsByIdNumber(userData.idNumber)) {
        throw new Error("This ID number is already registered!");
    }

    if (await usersDal.isUserExistsByEmail(userData.email)) {
        throw new Error("This email is already registered!");
    }
}

function validateRegisterUserData(userData) {
    if (!isEmalValid(userData.email)) {
        throw new Error("Invalid email");
    }

    if (userData.email.length > 100) {
        throw new Error("Email address is too long");
    }

    if (!userData.password) {
        throw new Error("Invalid password");
    }

    if (userData.password.length < 8) {
        throw new Error("Password is too short");
    }

    if (userData.password.length > 45) {
        throw new Error("Password is too long");
    }

    if (!userData.firstName) {
        throw new Error("Invalid first name");
    }

    if (userData.firstName.length < 3) {
        throw new Error("First name is too short");
    }

    if (userData.firstName.length > 45) {
        throw new Error("First name is too long");
    }

    if (!userData.lastName) {
        throw new Error("Invalid last name");
    }

    if (userData.lastName.length < 3) {
        throw new Error("Last name is too short");
    }

    if (userData.lastName.length > 45) {
        throw new Error("Last name is too long");
    }

    if (!isIsraeliIdValid(userData.idNumber)) {
        throw new Error("Invalid ID number");
    }

    if (!userData.city) {
        throw new Error("Invalid city");
    }

    if (!userData.streetAddress) {
        throw new Error("Invalid street address");
    }

    if (userData.streetAddress.length > 100) {
        throw new Error("Street address is too long");
    }
}

function validateLoginUserData(userData) {
    if (!isEmalValid(userData.email)) {
        throw new Error("Invalid email");
    }

    if (!userData.password) {
        throw new Error("Invalid password");
    }
}

async function userLogin(userLoginData) {
    validateLoginUserData(userLoginData);

    userLoginData.password = encryptPassword(userLoginData.password);

    if (!await usersDal.isUserExistsByEmail(userLoginData.email)) {
        throw new Error("This email is not registered!");
    }

    let userData = await usersDal.userLogin(userLoginData);

    if (!userData) {
        throw new Error("The password you entered is incorrect!");
    }

    const token = jwt.sign({ userId: userData.id, userType: userData.userType }, config.secret);
    let successfulLoginResponse = { token, firstName: userData.firstName };
    return successfulLoginResponse;
}

function encryptPassword(password) {
    const saltRight = "*RrYuezjpRSdEW6^HpQW$aVV4iMgGb";
    const saltLeft = "jEx4UjTUGHo9x9F^%oP#n^9rdC3wkQ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}

async function getUserData(userId) {
    let userData = await usersDal.getUserData(userId);
    return userData;
}

module.exports = {
    emailAndIdNumberUnique,
    addUser,
    userLogin,
    getUserData
};