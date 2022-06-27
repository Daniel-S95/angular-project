let connection = require("./connection-wrapper");

async function addProductToCart(cartData) {
    let sql = "INSERT INTO cart_products (`product_id`, `quantity`, `total_price`, `cart_id`) VALUES (?, ?, ?, ?);";
    let parameters = [cartData.productId, cartData.quantity, (cartData.quantity * cartData.price), cartData.cartId];
    await connection.executeWithParameters(sql, parameters);
}

async function getCartItems(cartId) {
    let sql = `SELECT cp.id, cp.product_id AS productId, cp.quantity, cp.total_price AS totalPrice, p.name, p.price, p.image_url as imageURL FROM
        cart_products cp JOIN products p ON p.id= cp.product_id WHERE cart_id = ? ORDER BY cp.id ASC;`;
    let parameters = [cartId];
    let cartItems = await connection.executeWithParameters(sql, parameters);
    return cartItems;
}

async function isCartExists(userId) {
    let sql = "SELECT id, creation_date as creationDate FROM shopping_carts WHERE user_id = ?;";
    let parameters = [userId];
    let openCart = await connection.executeWithParameters(sql, parameters);
    return openCart;
}

async function updateCartItemQuantity(cartData) {
    let { newUpdatedQuantity, newUpdatedTotalPrice, cartItemId, cartId } = cartData;

    let sql = "UPDATE cart_products SET quantity = ?, total_price = ? WHERE (id = ?) AND cart_id = ?;";
    let parameters = [newUpdatedQuantity, newUpdatedTotalPrice, cartItemId, cartId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteCartItem(cartItemId) {
    let sql = "DELETE FROM cart_products WHERE (id = ?);";
    let parameters = [cartItemId];
    await connection.executeWithParameters(sql, parameters);
}

async function createCart(userId) {
    let sql = "INSERT INTO shopping_carts (user_id) VALUES (?);";
    let parameters = [userId];
    let cartData = await connection.executeWithParameters(sql, parameters);
    return cartData.insertId;
}

async function deleteCart(cartId) {
    let sql = "DELETE FROM shopping_carts WHERE (id = ?);";
    let parameters = [cartId];
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    addProductToCart,
    isCartExists,
    getCartItems,
    updateCartItemQuantity,
    deleteCartItem,
    createCart,
    deleteCart
};