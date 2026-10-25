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
                ref: "Product",
                required: true
            },
            productNameAtPurchase: {
                type: String,
                trim: true
            },
            productImageAtPurchase: {
                type: String,
                trim: true
            },
            productAtPurchase: {
                type: Number,
                min: 0
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],

    // Monetary amounts are in the store's displayed currency.
        // Optional temporarily for existing orders created before this change.
        subtotal: {
            type: Number,
            min: 0
        },

        shippingCost: {
            type: Number,
            min: 0
        },

        taxAmount: {
            type: Number,
            min: 0
        },

    totalAmount: {
        type: Number,
        min: 0,
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