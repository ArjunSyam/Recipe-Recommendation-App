import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Login_Register.css';
import {Helmet} from 'react-helmet';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        console.log(username,password)
        event.preventDefault();
        try {
            const response = await axios.post('https://recipe-api-9ocv.onrender.com/api/users/login', 
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
                navigate('/SavedRecipes');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="wrapper">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="container main">
                <div className = "row">
                    <div className="col-md-6 side-image">
                    </div>
                </div>

                <div className = "col-md-6 right">
                    <div className= "input-box">
                        <header>Login</header>

                        <form onSubmit={handleSubmit}>
                            <div className = "input-field">
                                <input
                                    type="email"
                                    id="loginEmail"
                                    className="input"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <label htmlFor="email">Email</label>
                            </div>

                            <div className = "input-field">
                                <input
                                    type="password"
                                    id="loginPassword"
                                    className="input"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <label htmlFor="pass">Password</label>
                            </div>

                            <div className = "input-field">
                                <button type="submit" className="submit">Login</button>
                            </div>
                        </form>

                        <div className="error">
                                {error && <p id="loginMessage" className="error text-danger">{error}</p>}
                        </div>

                        <div className="signin">
                                <p className="toggle">Don't have an account? <Link to="/Register" className="text-primary">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;