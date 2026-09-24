import Cart from "../models/carts.js"


export const getCartService = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if(!cart){
        cart = await Cart.create({ user: userId, items: []});
    }

    return cart;
}

export const addToCartService = async (userId, productId, quantity)  => {
    let cart = await Cart.findOne({ user: userId });

    if(!cart){
        cart = await Cart.create({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if(itemIndex > -1){
        // product exists -> increase quantity
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    return cart;
}

export const removeFromCartService = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();

    return cart;
}

export const increaseQuantityService = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });

    if(!cart){
        throw new Error("Cart not found");
    }

    const item = cart.items.find(
        item => item.product.toString() === productId
    );

    if(!item){
        throw new Error("Product not found in cart");
    }

    item.quantity += 1;

    await cart.save();

    return cart;
}

export const decreaseQuantityService = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });

    if(!cart){
        throw new Error("Cart not found");
    }

    const item = cart.items.find(item => item.product.toString() === productId);

    if(!item){
        throw new Error("Product not found in cart");
    }

    if (item.quantity > 1) {
        item.quantity -= 1;
    } 
    
    await cart.save();

    return cart;
}