import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        console.log(username,email,password)
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', 
                {username,email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                console.log('Sign up Successful');
                window.location.href = '/Login';
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
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                    
                    <div className='row mt-4'>
                        <div className="col">
                            <form id="loginForm" onSubmit={handleSubmit}>
                                <div className="row justify-content-center mt-2">
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="username"
                                            className="form-control"
                                            placeholder="username"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row justify-content-center mt-2">
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="loginEmail"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
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
                    
                    <div className='row mt-3'>
                        <div className="col">
                            <p className="toggle">Already have an account? <Link to="/Login" className="text-primary">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;