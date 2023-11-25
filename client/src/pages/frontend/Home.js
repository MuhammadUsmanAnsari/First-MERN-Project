import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div>This is Home Page</div>
            <div className="container text-center mt-5">
                <Link to="/dashboard">Go to Dashboard</Link>
            </div>
        </>
    )
}
