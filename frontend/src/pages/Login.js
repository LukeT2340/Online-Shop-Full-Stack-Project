import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'

// Login Page
const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        await login(email, password);
    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title text-center mb-4">Login</h1>
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" >Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" onChange={handleEmailChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={handlePasswordChange} required />
                            </div>
        
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <button disabled={isLoading} type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;