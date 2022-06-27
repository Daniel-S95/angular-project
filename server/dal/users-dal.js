let connection = require("./connection-wrapper");

async function addUser(userRegistrationData) {
    let sql = "INSERT INTO users (`first_name`, `last_name`, `email`, `id_number`, `password`, `city`, `street_address`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let parameters = [userRegistrationData.firstName, userRegistrationData.lastName, userRegistrationData.email, userRegistrationData.idNumber, userRegistrationData.password, userRegistrationData.city, userRegistrationData.streetAddress];
    await connection.executeWithParameters(sql, parameters);
}

async function isUserExistsByEmail(userEmail) {
    let sql = "SELECT * FROM users WHERE email = ?";
    let parameters = [userEmail];
    let users = await connection.executeWithParameters(sql, parameters);

    if (users.length === 0) {
        return false;   
    }
    return true;
}

async function isUserExistsByIdNumber(userIdNumber) {
    let sql = "SELECT * FROM users WHERE id_number = ?";
    let parameters = [userIdNumber];
    let users = await connection.executeWithParameters(sql, parameters);

    if (users.length === 0) {
        return false;
    }
    return true;
}

async function userLogin(userLoginData) {
    let sql = 'SELECT u.id, u.user_type AS userType, u.first_name AS firstName FROM users u WHERE email = ? AND password = ?;';
    let parameters = [userLoginData.email, userLoginData.password];
    let [userData] = await connection.executeWithParameters(sql, parameters);

    if (!userData) {
        return null;
    }

    return userData;
}

async function getUserData(userId) {
    let sql = 'SELECT u.street_address AS streetAddress, u.city, sc.id AS cartId, sc.creation_date AS cartCreationDate, (MAX(o.id)) AS orderId, o.order_date as orderDate FROM users u LEFT JOIN shopping_carts sc ON sc.user_id = u.id LEFT JOIN orders o ON o.customer_id = u.id WHERE u.id = ? UNION SELECT u.street_address AS streetAddress, u.city, sc.id AS cartId, sc.creation_date AS cartCreationDate, (MAX(o.id)) AS orderId, o.order_date as orderDate FROM users u LEFT JOIN shopping_carts sc ON sc.user_id = u.id LEFT JOIN orders o ON o.customer_id = u.id WHERE u.id = ?;';
    let parameters = [userId, userId];
    let [userData] = await connection.executeWithParameters(sql, parameters);
    return userData;
}

module.exports = {
    isUserExistsByIdNumber,
    isUserExistsByEmail,
    addUser,
    userLogin,
    getUserData
};