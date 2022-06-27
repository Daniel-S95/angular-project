const productsDal = require('../dal/products-dal');

async function addProduct(productData) {
    validateProductData(productData);
    await productsDal.addProduct(productData);
}

async function getAllProducts() {
    const products = await productsDal.getAllProducts();
    return products;
}

async function updateProduct(newProductData) {
    validateProductData(newProductData);
    await productsDal.updateProduct(newProductData);
}

async function getStats() {
    const stats = await productsDal.getStats();
    return stats;
}

async function getProductsByCategoryId(categoryId) {
    const productsByCategory = await productsDal.getProductsByCategoryId(categoryId);
    return productsByCategory;
}

async function getProductsBySubstring(substring) {
    const productsBySubstringName = await productsDal.getProductsBySubstring(substring);
    return productsBySubstringName;
}

async function getProductData(productId) {
    const productData = await productsDal.getProductData(productId);
    return productData;
}

function validateProductData(productData) {
    if (!productData.name) {
        throw new Error("Invalid name");
    }

    if (productData.name.length < 3) {
        throw new Error("Name is too short");
    }

    if (productData.name.length > 30) {
        throw new Error("Name is too long");
    }

    if (!productData.categoryId) {
        throw new Error("Invalid category");
    }

    if (!productData.price) {
        throw new Error("Invalid price");
    }

    if (productData.price < 0) {
        throw new Error("Price must be higher than $0");
    }

    if (productData.price > 9999) {
        throw new Error("Price can't be higher than $9,999");
    }

    if (!productData.imageURL) {
        throw new Error("Invalid image URL");
    }

    if (productData.imageURL.length > 250) {
        throw new Error("Image URL is too long");
    }
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