import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';

// Signup Page
const Signup = () => {
    const [ email, setEmail ] = useState('');
    const [ password1, setPassword1 ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    
    const {signup, error, isLoading} = useSignup();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword1Change = (e) => {
        setPassword1(e.target.value);
    };

    const handlePassword2Change = (e) => {
        setPassword2(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        await signup(email, password1, password2);
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title text-center mb-4">Signup</h1>
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" >Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" onChange={handleEmailChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={handlePassword1Change} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" onChange={handlePassword2Change} required />
                            </div>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <button disabled={isLoading} type="submit" className="btn btn-primary btn-block">Sign up</button>
                        </form>
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Signup;