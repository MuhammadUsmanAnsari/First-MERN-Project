import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

export default function Index() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/auth/login')
    }

    return (
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container">
                <Link class="navbar-brand" to="/">Navbar</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

                        {user
                            ? <li class="nav-item">
                                <button class="btn btn-primary" onClick={handleLogout}>Logout</button>
                            </li>
                            : <>
                                <li class="nav-item">
                                    <Link class="nav-link active" to="/auth/login">Login</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/auth/register">Register</Link>
                                </li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    )
}
