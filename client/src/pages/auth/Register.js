import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess && user) {
            toast.success("User Registered Successfully")
        }
        dispatch(reset())

    }, [user, isError, message, isSuccess, dispatch])

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
                            <div className="card px-4 py-5 border rounded-4 login-card my-5">
                                <h2 className='text-center py-4'>Register</h2>
                                <form className='text-center pb-4' onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="name" name='name' onChange={handleChange} placeholder="name@example.com" required />
                                        <label htmlFor="name" className='text-secondary'>Enter Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="email" name='email' onChange={handleChange} placeholder="name@example.com" required />
                                        <label htmlFor="email" className='text-secondary'>Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="password" name='password' onChange={handleChange} placeholder="Password" required />
                                        <label htmlFor="password" className='text-secondary'>Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="confirm" name='confirm_password' onChange={handleChange} placeholder="Password" required />
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
