let connection = require("./connection-wrapper");

async function addProduct(productData) {
    let sql = "INSERT INTO products (`name`, `category_id`, `price`, `image_url`) VALUES (?, ?, ?, ?);";
    let parameters = [productData.name, productData.categoryId, productData.price, productData.imageURL];
    await connection.executeWithParameters(sql, parameters);
}

async function getAllProducts() {
    let sql = "SELECT p.id, p.name, c.category_name AS categoryName, p.price, p.image_url as imageURL FROM products p JOIN categories c ON p.category_id = c.id ORDER BY p.id ASC;";
    let products = await connection.execute(sql);
    return products;
}

async function updateProduct(newProductData) {
    let sql = "UPDATE products SET `name` = ?, `category_id` = ?, `price` = ?, `image_url` = ? WHERE (`id` = ?);";
    let parameters = [newProductData.name, newProductData.categoryId, newProductData.price, newProductData.imageURL, newProductData.id];
    await connection.executeWithParameters(sql, parameters);
}

async function getStats() {
    let sql = "SELECT (SELECT COUNT(*) FROM products) AS numberOfProducts, (SELECT COUNT(*) FROM orders) AS numberOfOrders;";
    let stats = await connection.execute(sql);
    return stats;
}

async function getProductsByCategoryId(categoryId) {
    let sql = "SELECT p.id, p.name, c.category_name AS categoryName, p.price, p.image_url as imageURL FROM products p JOIN categories c ON p.category_id = c.id WHERE c.id = ? ORDER BY p.id ASC;";
    let parameters = [categoryId];
    let productsByCategory = await connection.executeWithParameters(sql, parameters);
    return productsByCategory;
}

async function getProductsBySubstring(substring) {
    let sql = "SELECT p.id, p.name, c.category_name AS categoryName, p.price, p.image_url AS imageURL FROM products p JOIN categories c ON p.category_id = c.id WHERE name LIKE CONCAT('%', ?, '%') ORDER BY p.id ASC;";
    let parameters = [substring];
    let productsBySubstring = await connection.executeWithParameters(sql, parameters);
    return productsBySubstring;
}

async function getProductData(productId) {
    let sql = "SELECT id, name, category_id as categoryId, price, image_url AS imageURL FROM products WHERE id = ?;";
    let parameters = [productId];
    let [productData] = await connection.executeWithParameters(sql, parameters);
    return productData;
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    getStats,
    getProductsByCategoryId,
    getProductsBySubstring,
    getProductData
};