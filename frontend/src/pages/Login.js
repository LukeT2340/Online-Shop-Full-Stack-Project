import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FaGoogle, FaApple } from 'react-icons/fa';
import '../styles/Login.css';

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
        <Container className="login-outer-container d-flex justify-content-center align-items-center">
            <div className="login-box border shadow justify-items-center align-items-center p-5">
                <div className="row">
                    <h2 className="mb-4 mx-auto">Login</h2> {/* Form title */}
                </div>
                <Form onSubmit={submitForm}>

                    {/* Sign in with Google */}
                    <Button variant="light" className="w-100 mb-2">
                        <FaGoogle className="me-2" /> Sign in with Google
                    </Button>

                    {/* Sign in with Apple */}
                    <Button variant="light" className="w-100">
                        <FaApple className="me-2" /> Sign in with Apple
                    </Button>

                    <div className="row justify-content-center align-items-center my-3">
                        <div className="col">
                            <hr className="w-100"></hr>
                        </div>
                        <div className="col-auto">
                            <span className="mx-1">OR</span>
                        </div>
                        <div className="col">
                            <hr className="w-100"></hr>
                        </div>
                    </div>

                    <Form.Group controlId="formBasicEmail" className='my-2'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={handleEmailChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            required 
                        />
                    </Form.Group>

                    <div className="row">
                        <Button type="submit" className="login-button w-100 mt-1 mx-auto">
                            {/* Show loading text when isLoading */}
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </div>
                </Form>
                {error && (
                    <p style={{ color: 'red', textAlign: 'left', 'font-size': '12px' }}>{error}</p>)
                    } 
                <p className="mt-3" style={{ textAlign: 'left' }}><Link to="/forgotpassword">Forgot password?</Link></p>
                <p style={{ textAlign: 'left' }}>New to Yeeica? <Link to="/register">Sign up</Link></p>            
            </div>
        </Container>
    );
};

export default Login;