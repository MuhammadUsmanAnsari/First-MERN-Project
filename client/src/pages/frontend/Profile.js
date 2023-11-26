import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { reset, updateUser } from "../../features/auth/authSlice"
import axios from "axios"

export default function Profile() {
    const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth)
    const [updatedUserData, setUpdatedUserData] = useState({ ...user, password: "" })
    const [imgSelected, setImgSelected] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess && user) {
            toast.success(message)
        }

        return () => {
            dispatch(reset())
        }

    }, [user, isError, message, isSuccess, dispatch])

    // on change function
    const handleChange = (e) => {
        setUpdatedUserData(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleChangeImage = async (e) => {
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        try {
            await axios.post("http://localhost:8000/api/upload", formData)
                .then((res) => {
                    let newUpdate = { ...updatedUserData }
                    setImgSelected(res.data.image);

                    if (updatedUserData.password.length == 0) {
                        delete newUpdate["password"]
                    }
                    newUpdate.image = res.data.image
                    dispatch(updateUser(newUpdate))

                })
        } catch (error) {
            toast.error("Error while uploading image")
        }

    }

    // handling submit function
    const handleSubmit = (e) => {
        e.preventDefault()
        let newUpdate = { ...updatedUserData }

        if (updatedUserData.password.length == 0) {
            delete newUpdate["password"]
        }
        if (imgSelected) {
            newUpdate.image = imgSelected
        }

        dispatch(updateUser(newUpdate))

    }

    return (
        <div className='container py-5'>
            <h1 className="text-center fw-bold">User Profile</h1>
            <div className="row">
                <div className="col text-center" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "end" }}>
                    <img src={` ${user && user.image ? `http://localhost:8000/${user.image}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}`} style={{ width: "200px", height: "200px", borderRadius: "50%" }} alt="" />
                    <div style={{ position: "absolute", transform: "translateX(50px)" }}>
                        <label htmlFor="image" className="btn btn-info btn-sm rounded-circle">
                            <img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/camera-512.png" width={20} alt="" />
                        </label>
                        <input type="file" className="form-control d-none" id="image" name='image' accept="image/*" onChange={handleChangeImage} placeholder="Change Password" />
                    </div>

                </div>
            </div>
            <form className='mt-5' onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-2 g-3 g-md-4">
                    <div className="col">
                        <div className="form-floating ">
                            <input type="text" className="form-control" id="name" name='name' defaultValue={user.name} onChange={handleChange} placeholder="Name" required />
                            <label className="text-body-tertiary" htmlFor="name" >Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating ">
                            <input type="email" className="form-control" id="email" name='email' defaultValue={user.email} disabled placeholder="Email" required />
                            <label className="text-body-tertiary" htmlFor="email" >Email</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating ">
                            <input type="password" className="form-control" id="change_password" name='password' onChange={handleChange} placeholder="Change Password" />
                            <label className="text-body-tertiary" htmlFor="change_password" >Update Password</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center">
                        <button className='btn btn-primary' type='submit'>
                            {isLoading ? <div className='spinner-border spinner-border-sm'></div> : "Update Profile"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
