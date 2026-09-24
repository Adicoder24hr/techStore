import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingInfo: {
        name: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        phone: String
    },
    status: {
        type: String,
        enum: ["Pending",
            "Processing",
            "Shipped",
            "Delivery",
            "Cancelled"
        ],
        default: "Pending"
    }
}, {timestamps: true});

export default mongoose.model("Order", orderSchema);