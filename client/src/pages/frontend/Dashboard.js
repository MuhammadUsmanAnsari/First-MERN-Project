import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createGoal, getGoals, deleteGoal, reset } from '../../features/goals/goalSlice'
import { toast } from 'react-toastify'


export default function Dashboard() {
    const { user } = useSelector(state => state.auth)
    const { goals, isLoading, isError, isSuccess, message } = useSelector(state => state.goals)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        // if (isSuccess && goals) {
        //     toast.success("User Logged in")
        // }
        dispatch(getGoals())
        return () => {
            dispatch(reset())
        }
    }, [isError, message])
console.log(goals);

    const [formTxt, setFormTxt] = useState("")


    const handleSubmit = e => {
        e.preventDefault()
        console.log(formTxt);
        dispatch(createGoal({ text: formTxt }))
        setFormTxt("")

    }
    return (
        <div className='container my-5'>
            <h2 className='text-center'>Hello {user && user.name}! Welcome to dashboard</h2>

            {/* goal form */}
            <form className='mt-5' onSubmit={handleSubmit}>
                <div className="form-floating mb-3 text-dark">
                    <input type="text" className="form-control text-dark" id="goal-txt" name='text' value={formTxt} onChange={e => setFormTxt(e.target.value)} placeholder="Please Enter Goal Text" required />
                    <label htmlFor="goal-txt" >Enter Goal Text</label>
                </div>
                <div className="text-center">
                    <button className='btn btn-primary ' type='submit'>Submit</button>
                </div>
            </form>

            {!goals.length
                ? <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "300px" }}>
                    <div className='spinner-border spinner-border-primary p-5 '></div>
                </div>
                : <div className='table-responsive mt-5'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Goal Text</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Id</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {goals.map((items, i) => {
                                return <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{items.text}</td>
                                    <td>{items.createdAt.split('T')[0]}</td>
                                    <td>{items.createdAt.split('T')[1].split('.')[0]}</td>
                                    <td>{items._id}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm me-2'>Edit</button>
                                        <button className='btn btn-danger btn-sm' onClick={()=>dispatch(deleteGoal(items._id))}>Del</button>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                </div>
            }



        </div>
    )
}
