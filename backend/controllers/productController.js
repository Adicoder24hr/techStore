import { createProductService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../services/productServices.js"


export const createProduct = async (req, res) =>{
    try{
        const product = await createProductService(req.body);

        if(!product){
            return res.status(400).json({
                message: "Failed to create the product!!"
            })
        }

        return res.status(200).json({
            message: "Product created successfully!",
            product
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getAllProducts = async (req, res) =>{
    try{
        const products = await getProductsService(req.query);

        if(!products || products.length === 0){
            return res.status(404).json({
                message: "No products found!!"
            })
        }

        return res.status(200).json({
            message: "Success",
            products
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await getProductByIdService(req.params.id);

        if(!product){
            return res.status(404).json({
                message: "Product not found!!"
            })
        }

        return res.status(200).json({
            message: "product found",
            product
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await updateProductService(req.params.id, req.body);

        if(!updateProduct){
            return res.status(400).json({
                message: "Error updating the product!!"
            })
        }

        return res.status(200).json({
            message: "Product updated successfully!",
            updatedProduct
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await deleteProductService(req.params.id);

        if(!deleteProduct){
            return res.status(404).json({
                message: "product does not exist!!"
            })
        }

        return res.status(200).json({
            message: "product deleted successfully!!",
            deletedProduct
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: err.message
        })
    }
}