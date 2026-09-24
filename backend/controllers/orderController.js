import { getSingleOrderService, getUserOrdersService, placeOrderService } from "../services/orderService.js"


export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const shippingInfo = req.body
        const order = await placeOrderService(userId, shippingInfo);

        return res.status(201).json({
            message: "Order placed successfully",
            order
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: err.message
        })
    }
}

export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await getUserOrdersService(userId);

        if(!orders || orders.length === 0){
            return res.status(404).json({
                message: "No orders found!!"
            })
        }

        return res.status(200).json({
            message: "Orders retrieved successfully",
            orders
        });
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            message: err.message
        })
    }
}

export const getSingleOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        const order = await getSingleOrderService(orderId, userId);

        if(!order){
            return res.status(404).json({
                message: "Order not found!!"
            })
        }

        return res.status(200).json({
            message: "Order retrieved successfully",
            order
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: err.message
        })
    }
}