const cartsDal = require('../dal/carts-dal');
const productsDal = require('../dal/products-dal');
const usersDal = require('../dal/users-dal');
const decodeToken = require('../utilities/decode-token');

async function addProductToCart(cartData) {
    let { userToken } = cartData;
    let decodedToken = decodeToken.decodeToken(userToken);
    let userId = decodedToken.userId;

    if (!userId) {
        throw new Error('Invalid user');
    }

    let { cartId } = await usersDal.getUserData(userId);

    cartData = { ...cartData, cartId };

    validateNewCartData(cartData);

    let productData = await productsDal.getProductData(cartData.productId);
    cartData = { ...cartData, price: productData.price };
    await cartsDal.addProductToCart(cartData);
}

async function getCartItems(cartId) {
    if (!cartId) {
        throw new Error('Cart is invalid');
    }

    let cartItems = await cartsDal.getCartItems(cartId);
    return cartItems;
}

async function isCartExists(userId) {
    if (!userId) {
        throw new Error('Invalid user');
    }

    let openCart = await cartsDal.isCartExists(userId);

    if (openCart.length === 0) {
        return null;
    }
    return openCart[0];
}

async function updateCartItemQuantity(cartData) {
    let { productId, cartId, quantityAdded } = cartData;

    let cartItemId = await cartsDal.getCartItemId({ productId, cartId });

    cartData = { ...cartData, cartItemId };

    validateUpdateCartData(cartData);

    let productData = await productsDal.getProductData(productId);
    let currentCartItemData = await cartsDal.getCartItems(cartId);
    [currentCartItemData] = currentCartItemData.filter(cartItem => cartItem.id === cartItemId);

    let newUpdatedQuantity = quantityAdded + currentCartItemData.quantity;
    let newUpdatedTotalPrice = (productData.price * quantityAdded) + currentCartItemData.totalPrice;

    let updatedCartItemData = { newUpdatedQuantity, newUpdatedTotalPrice, cartItemId, cartId }

    await cartsDal.updateCartItemQuantity(updatedCartItemData);
}

async function deleteCartItem(cartItemId) {
    if (!cartItemId) {
        throw new Error('Cart item is invalid');
    }

    await cartsDal.deleteCartItem(cartItemId);
}

async function createCart(userToken) {
    let decodedToken = decodeToken.decodeToken(userToken);
    let userId = decodedToken.userId;

    if (!userId) {
        throw new Error('Invalid user');
    }

    let cartId = await cartsDal.createCart(userId);
    return cartId;
}

async function deleteCart(cartId) {
    if (!cartId) {
        throw new Error('Cart is invalid');
    }

    await cartsDal.deleteCart(cartId);
}

function validateNewCartData(cartData) {
    if (!cartData.productId) {
        throw new Error('Product is invalid');
    }

    if (!cartData.quantity) {
        throw new Error('Product quantity is invalid');
    }

    if (!cartData.cartId) {
        throw new Error('Cart is invalid');
    }
}

function validateUpdateCartData(cartData) {
    if (!cartData.quantityAdded) {
        throw new Error('Invalid quantity');
    }

    if (!cartData.cartId || !cartData.productId || !cartData.quantityAdded || !cartData.cartItemId) {
        throw new Error('Invalid cart data');
    }
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