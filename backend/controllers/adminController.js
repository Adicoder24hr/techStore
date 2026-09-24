import { getAllOrdersService, updateOrderStatusService } from "../services/adminOrderService.js"


export const getAllOrders = async (req, res) => {
    try{
        const orders = await getAllOrdersService();

        return res.status(200).json({
            "message": "Orders retrieved successfully",
            orders
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            message: err.message
        });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await updateOrderStatusService(orderId, status);

        return res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: err.message
        })
    }
}