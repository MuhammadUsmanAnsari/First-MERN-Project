import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div className="container text-center mt-5">
                <div className='mb-4'>Home Page</div>
                <Link to="/dashboard">Go to Dashboard</Link>
            </div>
        </>
    )
}
