import React, { useState, useContext, useEffect } from 'react'

const User = () => {
    const host = "http://localhost:5000"
    const [user, setUser] = useState({userid: "", name: "", email: ""})

    // Get User Data
  const getUserData = async () => {
    // API call
    const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token') 
        },
    });
    const item = await response.json()
    console.log(item)
    setUser(item)
  }

    useEffect(() => {
        if (localStorage.getItem('token')){
            getUserData()
        }else{
        }    
    }, [])

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <div className='container'>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label"><strong>User ID</strong></label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="userid" onChange={onChange} value={user._id}  name='userid' />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label"><strong>Name</strong></label>
                <div className="col-sm-10">
                    <strong>
                    <input type="text"  className="form-control-plaintext" id="name" value={user.name}  name='name' />
                    </strong>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label"><strong>Email</strong></label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="email" value={user.email}  name='email'/>
                </div>
            </div>  
        </div>
    )
}

export default User
