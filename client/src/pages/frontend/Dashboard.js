import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, getProducts, deleteProduct, reset, updateProduct } from '../../features/products/productSlice'
import { toast } from 'react-toastify'
import axios from 'axios'

const initialState = {
    title: "",
    category: "",
    price: "",
    description: "",
    image: ""
}


export default function Dashboard() {
    const { user } = useSelector(state => state.auth)
    const { products, isLoading, isError, isSuccess, message } = useSelector(state => state.products)
    const [productData, setProductData] = useState(initialState)
    const [imgSelected, setImgSelected] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success(message)
        }
        dispatch(getProducts())

        return () => {
            dispatch(reset())
        }

    }, [isError, message, dispatch])


    const handleChange = e => setProductData(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleImageChange = async (e) => {
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        try {
            await axios.post("http://localhost:8000/api/upload", formData)
                .then((res) => {
                    productData.image = res.data.image
                })
        } catch (error) {
            toast.error("Error while uploading image")
        }
    }

    // handle submit
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createProduct(productData))
        setProductData(initialState)
    }

    // handle edit
    const handleEdit = product => {
        let data = {
            title: product.title,
            price: product.price,
            category: product.category,
            description: product.description,
            _id: product._id
        }
        setProductData(data)

    }

    // handle update
    const handleUpdate = () => {
        if (!productData._id) {
            return toast.error("Please add product first then update")
        } else {
            console.log(productData._id);
            dispatch(updateProduct(productData))
            setProductData(initialState)
        }
    }


    return (
        <>
            <div className='container my-5'>
                <h1 className='fw-bold text-center'>Hello <span className='text-primary'>{user && user.name}</span>! Welcome to dashboard</h1>
                <div className="row my-5">
                    <h3>Add Product</h3>
                    <div className="col mt-2">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 ">
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control" id="title" name='title' value={productData.title} onChange={handleChange} placeholder="Enter Title" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="number" className="form-control" id="price" name='price' value={productData.price} onChange={handleChange} placeholder="Enter Price" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <select className="form-select " name='category' value={productData.category} onChange={handleChange} aria-label="Default select example" required>
                                        <option value="">Select Category</option>
                                        <option value="mens-shoes">mens-shoes</option>
                                        <option value="furniture">furniture</option>
                                        <option value="mens-shirts">mens-shirts</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="file" accept='image/*' className="form-control" id="image" name='image' onChange={handleImageChange} placeholder="Enter Price" required />
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control" id="description" name='description' value={productData.description} onChange={handleChange} placeholder='Enter Description' rows="3"></textarea>
                                </div>
                            </div>
                            <div className="row  g-2 g-md-4 mt-4 text-center">
                                <div className="col-12 col-md-3 ms-auto text-center">
                                    <button className='btn btn-primary w-100 ' type='submit'>
                                        {isLoading ? <div className='spinner-border spinner-border-sm'></div> : "Submit"}
                                    </button>
                                </div>
                                <div className="col-12 col-md-3 me-auto text-center">
                                    <button className='btn btn-primary w-100' type="button" onClick={handleUpdate}>
                                        {isLoading ? <div className='spinner-border spinner-border-sm'></div> : "Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
            <hr />

            <div className="container-fluid bg-light mt-4 py-4">
                <div className="container">
                    {
                        isLoading
                            ? <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "300px" }}>
                                <div className='spinner-border spinner-border-primary p-5 '></div>
                            </div>
                            : <>
                                {!products.length
                                    ? <h2 className='py-5 text-center text-primary'>No products available.</h2>
                                    : <div className="row">
                                        <div className="col">
                                            <div className='table-responsive'>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col" className='text-center'>Img</th>
                                                            <th scope="col">Title</th>
                                                            <th scope="col">Category</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Date</th>
                                                            {/* <th scope="col">Time</th> */}
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map((item, i) => {
                                                            return <tr key={i}>
                                                                <th scope="row">{i + 1}</th>
                                                                <td className='text-center'> <img src={`http://localhost:8000/${item.image}`} width={70} height={70} alt="product-image" /></td>
                                                                <td>{item.title}</td>
                                                                <td>{item.category}</td>
                                                                <td>{"$ " + item.price}</td>
                                                                <td>{item.description.length > 25 ? item.description.slice(0, 25) + "..." : item.description}</td>
                                                                <td>{item.createdAt.split('T')[0]}</td>
                                                                {/* <td>{item.createdAt.split('T')[1].split('.')[0]}</td> */}
                                                                <td>
                                                                    <button className='btn btn-danger p-1 btn-sm me-1' onClick={() => handleEdit(item)}>Edit</button>
                                                                    <button className='btn btn-danger p-1 btn-sm' onClick={() => dispatch(deleteProduct(item._id))}>
                                                                        {isLoading ? <div className='spinner-border spinner-border-sm'></div> : "Del"}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                    }
                </div>
            </div>
        </>

    )
}
