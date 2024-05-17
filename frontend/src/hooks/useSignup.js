import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async(email, password) => {
        setIsLoading(true);
        setError(null);

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        // Handle username doesn't meet complexity requirements
        if (!passwordRegex.test(trimmedPassword)) {
            setError("Your password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");
            setIsLoading(false);
            return;
        }

        const userData = {
            email: trimmedEmail,
            password: trimmedPassword,
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
        });

        // Handle unsuccessful sign up
        if (!response.ok) {
            const errorData = await response.json();
            setIsLoading(false);
            setError(errorData.errorMessage || 'Unknown server error. Please try again later.');
            
        }

        // Handle successful sign up
        if (response.ok) {
            const json = await response.json();
            
            // Save the use to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // Update auth context
            dispatch({type: 'LOGIN', payload: json});
        
            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
};
