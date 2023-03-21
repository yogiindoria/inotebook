import React, { useState, useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';

const User = () => {
    const context = useContext(noteContext);
    const { getUserData } = context;
    useEffect(() => {
        if (localStorage.getItem('token')){
            getUserData()
        }else{
        }    
    }, [])

    return (
        <div className='container'>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">User ID</label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="userid" name='userid' />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="name" name='name' />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="text"  className="form-control-plaintext" id="email" name='email' />
                </div>
            </div>  
        </div>
    )
}

export default User
