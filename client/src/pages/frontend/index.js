import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'

export default function index() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>

        </>
    )
}
