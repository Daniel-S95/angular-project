const ordersDal = require('../dal/orders-dal');
const cartsDal = require('../dal/carts-dal');

async function unavailableDates() {
    let unavailableDates = await ordersDal.unavailableDates();
    return unavailableDates;
}

async function createOrder(orderData) {
    validateOrderData(orderData);

    if (await ordersDal.dateAvailability(orderData.deliveryDate) >= 3) {
        throw new Error('The shipping date is unavailable');
    }

    let cartItems = await cartsDal.getCartItems(orderData.cartId);
    let cartTotalPrice = cartItems.reduce((totalOrderValue, obj) => obj.totalPrice + totalOrderValue, 0);
    orderData = { ...orderData, cartTotalPrice };
    
    await ordersDal.createOrder(orderData);
}

function validateOrderData(orderData) {
    if (!orderData.customerId || !orderData.cartId) {
        throw new Error('Invalid order request');
    }

    if (!orderData.city || orderData.city.length < 3 || orderData.city.length > 45) {
        throw new Error('Invalid city');
    }

    if (!orderData.streetAddress || orderData.streetAddress.length < 3 || orderData.streetAddress.length > 100) {
        throw new Error('Invalid street address');
    }

    if (!orderData.creditCard || orderData.creditCard.length !== 4) {
        throw new Error('Invalid credit card');
    }
}

module.exports = {
    unavailableDates,
    createOrder
};