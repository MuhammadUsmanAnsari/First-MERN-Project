import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// create new product
export const createProduct = createAsyncThunk('product/create', async (productData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.createProduct(productData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error)
        return thunkAPI.rejectWithValue(message)
    }
})


// get products
export const getProducts = createAsyncThunk('product/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.getProducts(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error)
        return thunkAPI.rejectWithValue(message)
    }
})

// delete product
export const deleteProduct = createAsyncThunk('product/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.deleteProduct(id, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error)
        return thunkAPI.rejectWithValue(message)
    }
})

// update product
export const updateProduct = createAsyncThunk('product/update', async (productData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.updateProduct(productData._id, productData, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error)
        return thunkAPI.rejectWithValue(message)
    }
})


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products.push(action.payload)
                state.message = "Product added successfully"
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // getting products
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // delete product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = state.products.filter(product => product._id !== action.payload.id)
                state.message = "Product deleted successfully"

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // update product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
                state.message = "Product updated successfully"

            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer