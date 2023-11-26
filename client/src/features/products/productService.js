import axios from "axios";

const API_URL = 'http://localhost:8000/api/products/'

// create product
const createProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, productData, config)
    return response.data
}


// getting products
const getProducts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}


// delete products
const deleteProduct = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + productId, config)
    return response.data
}

// delete products
const updateProduct = async (productId, productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + productId, productData, config)
    return response.data
}

const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct
}

export default productService;