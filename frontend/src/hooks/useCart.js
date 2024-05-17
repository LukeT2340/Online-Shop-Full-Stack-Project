import { useState, useEffect } from 'react';

export const useCart = () => {
    const [cartEntries, setCartEntries] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Retrieve token from storage
                const userJson = localStorage.getItem('user');
                const user = JSON.parse(userJson);
                const token = user.token;

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/get`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.errorMessage || 'Unknown server error. Please try again later.');
                }

                const json = await response.json();
                setCartEntries(json);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();

    }, []);

    return { cartEntries, isLoading, error };
};
