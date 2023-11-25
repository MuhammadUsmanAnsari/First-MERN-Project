import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './_auth.css'
import { login, reset } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const initialState = {
    email: "",
    password: "",
}

export default function Login() {
    const [state, setState] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess && user) {
            navigate('/')
            toast.success("User Logged in")
        }
        dispatch(reset())

    }, [user, isError, message, isSuccess, navigate, dispatch])


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    //submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = state

        const userData = {
            email, password,
        }
        dispatch(login(userData))


    }

    return (
        <>
            <div className=' form-section login-from'>
                <div className="container">
                    <div className="row ">
                        <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
                            <div className="card px-4 py-5 border rounded-4 login-card">
                                <h2 className='text-center py-4'>Login</h2>
                                <form className='text-center pb-4' onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="email" name='email' onChange={handleChange} placeholder="name@example.com" />
                                        <label htmlFor="floatingInput" className='text-secondary'>Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="password" name='password' onChange={handleChange} placeholder="Password" />
                                        <label htmlFor="floatingPassword" className='text-secondary'>Password</label>
                                    </div>
                                    <div className='text-start mt-3 mb-5'>
                                        <span>Forgot password? <Link to="/auth/forgot-password">Click Here</Link></span>
                                    </div>
                                    <button className="btn btn-primary w-100 rounded-0">Login</button>
                                    <div className='mt-5 mx-2 text-white'>
                                        <span>Don't have an account?</span>
                                        <Link to="/auth/register" className=' mx-2'>Register</Link>
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
