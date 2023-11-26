import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import Profile from './Profile'

export default function index() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>

        </>
    )
}
