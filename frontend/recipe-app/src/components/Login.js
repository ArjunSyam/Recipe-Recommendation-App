import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        console.log(username,password)
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', 
                {email: username, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                console.log('Login Successful');
                console.log(response.data.accessToken);
                localStorage.setItem('token',response.data.accessToken)
                window.location.href = '/Home';
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="container text-center" id="loginContainer">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="row mt-4">
                        <div className="col">
                            <h2>Login</h2>
                        </div>
                    </div>
                    
                    <div className='row mt-4'>
                        <div className="col">
                            <form id="loginForm" onSubmit={handleSubmit}>
                                <div className="row justify-content-center mt-2">
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="loginEmail"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="row justify-content-center mt-2">
                                    <div className="col-md-9">
                                        <input
                                            type="password"
                                            id="loginPassword"
                                            className="form-control"
                                            placeholder="Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="row justify-content-center mt-3">
                                    <div className="col-md-9">
                                        <button type="submit" className="btn btn-primary w-100">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div className='row mt-3'>
                        <div className="col">
                            {error && <p id="loginMessage" className="error text-danger">{error}</p>}
                        </div>
                    </div>
                    
                    <div className='row mt-1'>
                        <div className="col">
                            <p className="toggle">Don't have an account? <Link to="/Register" className="text-primary">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;