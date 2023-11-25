import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './_auth.css'

const initialState = {
    email: "",
}

export default function ForgotPassword() {
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    //submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email } = state
        console.log(state);

    }

    return (
        <>
            <div className=' form-section login-from'>
                <div className="container">
                    <div className="row ">
                        <div className="col-12 offset-0 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
                            <div className="card px-4 py-5 border rounded-4 login-card">
                                <h2 className='text-center py-4'>Reset Password</h2>
                                <form className='text-center pb-4' onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control border-0 bg-transparent shadow-none border-bottom border-secondary border-2 rounded-0" id="email" name='email' onChange={handleChange} placeholder="name@example.com" />
                                        <label htmlFor="floatingInput" className='text-secondary'>Email address</label>
                                    </div>                                                                    
                                    <button className="btn btn-primary w-100 rounded-0">Login</button>
                                    <div className='mt-5 mx-2 text-white'>
                                        <span>Remember Password?</span>
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
