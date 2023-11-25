import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from '../pages/frontend'
import Auth from '../pages/auth'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

export default function Index() {
    const { user } = useSelector(state => state.auth)
    return (
        <>
            <Header />
            <Routes>
                <Route path='/*' element={user ? <Frontend /> : <Navigate to='/auth/login' />} />
                <Route path='/auth/*' element={!user ? <Auth /> : <Navigate to='/' />} />
            </Routes>
        </>
    )
}
