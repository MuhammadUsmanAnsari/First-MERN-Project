import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { register, reset } from '../../features/auth/authSlice'
import './_auth.css'

const initialState = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
}

export default function Register() {
    const [state, setState] = useState(initialState)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess && user) {
            navigate('/')
            toast.success("User Registered Successfully")
        }
        dispatch(reset())

    }, [user, isError, message, isSuccess, navigate, dispatch])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    //submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, confirm_password } = state
        
        if (password !== confirm_password) {
            return toast.error("Password do not match")
        } else {
            const userData = {
                name, email, password,
            }

            dispatch(register(userData))
        }

    }

    return (
        <>
            <div className=' form-section login-from'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
                            <div className="card px-4 py-5 border rounded-4 login-card">
                                <h2 className='text-center py-4'>Register</h2>
                                <form className='text-center pb-4' onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="name" name='name' onChange={handleChange} placeholder="name@example.com" />
                                        <label htmlFor="name" className='text-secondary'>Enter Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="email" name='email' onChange={handleChange} placeholder="name@example.com" />
                                        <label htmlFor="floatingInput" className='text-secondary'>Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="password" name='password' onChange={handleChange} placeholder="Password" />
                                        <label htmlFor="floatingPassword" className='text-secondary'>Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="confirm" name='confirm_password' onChange={handleChange} placeholder="Password" />
                                        <label htmlFor="confirm" className='text-secondary'>Confirm Password</label>
                                    </div>
                                    <button className="btn btn-primary w-100 rounded-0" disabled={isLoading}>
                                        {isLoading ?
                                            <div className='spinner-border spinner-border-sm'></div>
                                            : "Register"
                                        }
                                    </button>
                                    <div className='mt-5 mx-2 text-white'>
                                        <span>Already have an account?</span>
                                        <Link to="/auth/login" className=' mx-2'>Login</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
