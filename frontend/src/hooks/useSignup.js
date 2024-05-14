import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async(username, email, password1, password2) => {
        setIsLoading(true);
        setError(null);

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword1 = password1.trim();
        const trimmedPassword2 = password2.trim();
        const usernameRegex = /^[a-zA-Z0-9]*$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Handle username not long enough
        if (trimmedUsername.length < 5) {
            setError("Usernames must be five or more characters.");
            setIsLoading(false);
            return;
        }

        // Handle username contains special characters
        if (!usernameRegex.test(trimmedUsername)) {
            setError("Usernames must only contain letters and numbers.");
            setIsLoading(false);
            return;
        }

        // Handle passwords don't match
        if (trimmedPassword1 !== trimmedPassword2) {
            setError("Passwords don't match");
            setIsLoading(false);
            return;
        }

        // Handle username doesn't meet complexity requirements
        if (!passwordRegex.test(trimmedPassword1)) {
            setError("Your password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");
            setIsLoading(false);
            return;
        }

        const userData = {
            username: trimmedUsername,
            password: trimmedPassword1,
            email: trimmedEmail
        };

        const response = await fetch('${process.env.API_URL}/user/signup', {
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
