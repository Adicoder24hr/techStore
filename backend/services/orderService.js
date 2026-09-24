import carts from "../models/carts.js"
import Order from "../models/order.js";


export const placeOrderService = async (userId, shippingInfo) => {
    const cart = await carts.findOne({ user: userId }).populate("items.product");

    if(!cart || cart.items.length === 0){
        throw new Error("Cart is empty!!");
    }

    let totalAmount = 0;

    const orderItems = cart.items.map(item => {
        totalAmount += item.product.price * item.quantity;

        return {
            product: item.product._id,
            quantity: item.quantity
        }
    })

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingInfo
    })

    cart.items = [];
    await cart.save();

    return order;
}

export const getUserOrdersService = async (userId) => {
    const orders = await Order.find({ user: userId }).populate("items.product");

    return orders;
}

export const getSingleOrderService = async (orderId, userId) => {
    const order = await Order.findById(orderId).populate("items.product");

    if(!order){
        throw new Error("Order not found!!");
    }

    if(order.user.toString() !== userId){
        throw new Error("Not Authorized!!");
    }

    return order;
}