import Cart from "../models/carts.js"
import Products from "../models/products.js";


export const getCartService = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if(!cart){
        cart = await Cart.create({ user: userId, items: []});
    }

    return cart;
}

export const addToCartService = async (userId, productId, quantity)  => {

    //1. find the product
    const product = await Products.findById(productId);

    if(!product){
        throw new Error("Product not found");
    }


    //2. check stock availability
    if (product.stock <= 0){
        throw new Error("Product is out of stock");
    }

    //3. check if the product is already in the cart
    let cart = await Cart.findOne({ user: userId });

    //4. create a new cart if it doesn't exist
    if(!cart){
        cart = await Cart.create({ user: userId, items: [] });
    }

    //5. check whether the product already exists
     const existingItem = cart.items.find(
        item =>
            item.product.toString() === productId
    );

    if(existingItem){

        const newQuantity = existingItem.quantity + quantity;

        if(newQuantity > product.stock){
            throw new Error(
                `Only ${product.stock} units are available`
            )
        }

        // product exists -> increase quantity
        existingItem.quantity = newQuantity;
    } else {

        if(quantity > product.stock){
            throw new Error(
                `Only ${product.stock} units are available`
            );
        }


        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("items.product");

    return cart;
}

export const removeFromCartService = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });

    if(!cart){
        throw new Error("Cart not found");
    }

    const itemExists = cart.items.some(
        item => item.product.toString() === productId
    )

    if(!itemExists){
        throw new Error("Product not found in cart");
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate("items.product");

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

    const product = await Products.findById(productId);

    if(!product){
        throw new Error("Product not found!");
    }

    if(item.quantity >= product.stock){
        throw new Error(`Only ${product.stock} units are available`);
    }

    item.quantity += 1;

    await cart.save();

    await cart.populate("items.product");

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

    await cart.populate("items.product");

    return cart;
}