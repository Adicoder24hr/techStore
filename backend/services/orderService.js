import mongoose from "mongoose";
import carts from "../models/carts.js"
import Order from "../models/order.js";
import Product from "../models/products.js";

// Store configuration for our TechStore demo.
// Tax is 8%, and orders over $50 qualify for free shipping.
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD_CENTS = 5000;
const SHIPPING_FEE_CENTS = 999; //$9.99 below the threshold

const toCent = (amount) => Math.round(amount * 100);


// place an order using mongodb transaction
export const placeOrderService = async (userId, shippingInfo) => {

    const session = await mongoose.startSession();

    let createdOrder;

    try{
        await session.withTransaction(async ()=>{
            
            // STEP 1: Find the user's cart inside this transaction
            const cart = await carts.findOne({
                user: userId
            }).session(session);

            if(!cart || cart.items.length === 0){
                throw new Error("Cart is empty!!");
            }

            // STEP 2: Fetch the current product documents.
            const productIds = cart.items.map(
                item => item.product
            )

            const products = await Product.find({
                _id: { $in: productIds}
            }).session(session);

            //  Map products by ID for efficient lookup
            const productMap = new Map(
                products.map(product => [
                    product._id.toString(),
                    product
                ])
            );

            // STEP 3: Validate all items and build order snapshot
            let subTotalCents = 0;

            const orderItems = cart.items.map(item => {
                const productId = item.product.toString();
                const product = productMap.get(productId);

                if(!product){
                    throw new Error(`Product ${productId} no longer exists`)
                }

                const quantity = item.quantity;

                if(
                    !Number.isInteger(quantity) ||
                    quantity < 1
                ){
                    throw new Error(
                        `Invalid quantity for ${product.name}`
                    )
                }

                if(
                    !Number.isFinite(product.price) ||
                    product.price <= 0
                ){
                    throw new Error(
                        `Invalid price for ${product.name}`
                    )
                }

                if(product.stock < quantity){
                    throw new Error(
                        `Insufficient stock for ${product.name}. ` + 
                        `Available: ${product.stock}, requested: ${quantity}`
                    )
                }

                // use the price currently stored in mongoDB
                const unitePriceCents = toCent(product.price);

                subTotalCents += unitePriceCents * quantity;

                // store the purchase-time details in the order
                return {
                    product: product._id,
                    productNameAtPurchase: product.name,
                    productImageAtPurchase: product.image,
                    priceAtPurchase: unitePriceCents / 100,
                    quantity
                };
            });

            // STEP 4: Calculate shipping, tax, and total
            const shippingCostCents = 
                subTotalCents > FREE_SHIPPING_THRESHOLD_CENTS
                ? 0
                : SHIPPING_FEE_CENTS;

            const taxCents = Math.round(
                subTotalCents * TAX_RATE
            );

            const totalCents = subTotalCents + shippingCostCents + taxCents;

            // STEP 5: Decrease stock safely.
            // The stock condition protects against overselling
            for(const item of cart.items){
                const productId = item.product.toString();

                const result = await Product.updateOne(
                    {
                        _id: productId,
                        stock: {$gte: item.quantity}
                    },
                    {
                        $inc: {
                            stock: -item.quantity
                        }
                    },
                    {session}
                );

                if(result.matchedCount !== 1){
                    throw new Error(
                        "Stock changed during checkout. " + 
                        "Please refresh your cart and try again."
                    );
                }
            }

            // STEP 6: Create the order in the same transaction
            const orders = await Order.create(
                [
                    {
                        user: userId,
                        items: orderItems,
                        subtotal: subTotalCents / 100,
                        shippingCost: shippingCostCents / 100,
                        taxAmount: taxCents / 100,
                        totalAmount: totalCents / 100,
                        shippingInfo,
                        status: "Pending"
                    }
                ],
                {session}
            );

            createdOrder = orders[0];

            // STEP 7: clear the cart only inside this transaction
            cart.items = [];

            await cart.save({ session });
        });

        return createdOrder;
    } finally { 
        await session.endSession();
    }
}

export const getUserOrdersService = async (userId) => {
    const orders = await Order.find({ user: userId }).populate("items.product").sort({ createdAt: -1 });

    return orders;
}

export const getSingleOrderService = async (orderId, userId) => {

    if (!mongoose.isValidObjectId(orderId)) {
        throw new Error("Invalid order ID");
    }

    const order = await Order.findById(orderId).populate("items.product");

    if(!order){
        throw new Error("Order not found!!");
    }

    if(order.user.toString() !== userId){
        throw new Error("Not Authorized!!");
    }

    return order;
}