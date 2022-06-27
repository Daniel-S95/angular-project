let connection = require("./connection-wrapper");

async function getAllCategories() {
    let sql = "SELECT id, category_name AS categoryName FROM categories ORDER BY category_name ASC;";
    let categories = await connection.execute(sql);
    return categories;
}

module.exports = {
    getAllCategories,
};