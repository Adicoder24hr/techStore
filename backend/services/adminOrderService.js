import Order from "../models/order.js";


export const getAllOrdersService = async () => {
    const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product")
    .sort({ createdAt: -1 });

    return orders;
}

export const updateOrderStatusService = async (orderId, status) => {
    const validStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]

    if(!validStatuses.includes(status)){
        throw new Error("Invalid order status!!");
    }

    const order = await Order.findById(orderId);

    if(!order){
        throw new Error("Order not found!!");
    }

    order.status = status;

    await order.save();

    return order;
}