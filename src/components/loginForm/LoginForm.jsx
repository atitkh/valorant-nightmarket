import React, { useState } from 'react'
import './loginForm.css'

function LoginForm({ Login, error, setLoading, loading }) {
    const [details, setDetails] = useState({ username: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        Login(details).then(() => {
            setLoading(false);
        });
    }

  return (
    <form onSubmit={submitHandler}>
        <div className="form-inner">
            <h2>RIOT Account Login</h2>
            {(error !== "") ? ( <><div className="error" style={{color: "red"}}>{error}</div><br /></> ) : ""}
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="username" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            {/* add loading when pressed login until response is received */}
            {loading ? <div className='loading' ><p>Please Wait</p></div> : <input type="submit" value="LOGIN" />} 
        </div>
    </form>
  )
}

export default LoginForm