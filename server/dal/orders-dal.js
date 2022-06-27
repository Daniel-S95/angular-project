let connection = require("./connection-wrapper");

async function unavailableDates() {
    let sql = "SELECT delivery_date as deliveryDate FROM orders GROUP BY delivery_date HAVING COUNT(delivery_date) >= 3 AND delivery_date >= CURDATE();";
    let unavailableDates = await connection.execute(sql);
    return unavailableDates;
}

async function createOrder(orderData) {
    let sql = "INSERT INTO orders (customer_id, cart_id, cart_total_price, city, street_address, delivery_date, credit_card_digits) VALUES (?, ?, ?, ?, ?, ?, ?);";
    let parameters = [orderData.customerId, orderData.cartId, orderData.cartTotalPrice, orderData.city, orderData.streetAddress, orderData.deliveryDate, orderData.creditCard];
    await connection.executeWithParameters(sql, parameters);
}

async function dateAvailability(date) {
    let sql = "SELECT COUNT(delivery_date) as numberOfOrders FROM orders WHERE delivery_date = ?;";
    let parameters = [date];
    let [shippingsPerDate] = await connection.executeWithParameters(sql, parameters);
    return shippingsPerDate.numberOfOrders;
}

module.exports = {
    unavailableDates,
    createOrder,
    dateAvailability
};