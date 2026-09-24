import { addToCartService, decreaseQuantityService, getCartService, increaseQuantityService, removeFromCartService } from "../services/cartService.js";


export const getCart = async (req, res) =>{
    try{
        const cart = await getCartService(req.user.id);
        return res.status(200).json({
            message: "Cart retrieved successfully",
            cart
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message
        })
    }
}

export const addToCart = async (req, res) => {
    try{
        const { productId, quantity } = req.body;
        const userId = req.user.id
        
        const cart = await addToCartService(userId, productId, quantity);

        return res.status(200).json({
            message: "Product added to card successfully",
            cart
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const cart = await removeFromCartService(userId, productId);

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: error.message
        })
    }
}

export const increaseQuantity = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;

        const cart = await increaseQuantityService(userId, productId);

        return res.status(200).json({
            message: "Product quantity increased successfully",
            cart
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: error.message
        })
    }
}

export const decreaseQuantity = async (req, res) => {
    try{
        const productId = req.params.productId;
        const userId = req.user.id;

        const cart = await decreaseQuantityService(userId, productId);

        return res.status(200).json({
            message: "Product quantity decreased successfully",
            cart
        })
    }catch(error){
        console.error(error);
        return res.status(400).json({
            message: error.message
        })
    }
}