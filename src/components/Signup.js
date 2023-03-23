import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser/", {
            method: "POST", 
            headers: {  
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
          });
          const json = await response.json(); 
          console.log(json);
          if (json.success){
            // Save the Auth Token and Redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account Created Successfully", "success")
          }else{
            props.showAlert("Invalid Details", "danger")
          }
    }
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <div className='container'>
      <h2 className='mx-5 my-4' style={{textAlign: "center"}}>Signup to Explore iNoteBook </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label"><strong>Name</strong></label>
                    <input type="text" className="form-control"  onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />                </div>
                <div/>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email Address</strong></label>
                    <input type="text" className="form-control"  onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                    <input type="password" className="form-control"  onChange={onChange} id="password" name='password' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><strong>Confirm Password</strong></label>
                    <input type="password" className="form-control"  onChange={onChange} id="cpassword" name='cpassword' minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Signup
