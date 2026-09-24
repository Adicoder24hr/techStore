import Product from "../models/products.js"

// service to create a new product
export const createProductService = async (data) =>{
    const product = await Product.create(data);

    if(!product){
        throw new Error("Failed to store the product!!");
    }

    return product;
};

// service to get all products
export const getProductsService = async (query) => {
    const { keyword, category, sort } = query;

    let filter = {}

    // search
    if(keyword){
        filter.name = { $regex: keyword, $options: "i"};
    }

    // filter by category
    if(category && category !== "All"){
        filter.category = category;
    }

    let productsQuery = Product.find(filter);

    //sorting

    if(sort === "price_low_high"){
        productsQuery = productsQuery.sort({ price: 1 })
    }
    else if( sort === "price_high_low"){
        productsQuery = productsQuery.sort({ price: -1 })
    }
    else if( sort === "rating"){
        productsQuery = productsQuery.sort({ rating: -1 })
    }
    else{
        productsQuery = productsQuery.sort({ createdAt: -1 })
    }

    const products = await productsQuery;

    return products;
}

export const getProductByIdService = async (id) => {
    const product = await Product.findById(id);

    if(!product){
        throw new Error("Product not found!!");
    }

    return product;
}

export const updateProductService = async (id, data) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true});

    if(!updatedProduct){
        throw new Error("Error updating the document");
    }

    return updatedProduct;
}

export const deleteProductService = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if(!deletedProduct){
        throw new Error("Error deleting the product!!");
    }

    return deletedProduct;
}