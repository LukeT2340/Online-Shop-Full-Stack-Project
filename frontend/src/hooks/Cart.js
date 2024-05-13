import { useState } from 'react';

export const Cart = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false);

    const addToCart = async (productId, quantity) => {
        setIsLoading(true);
        setError(null);
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;
        
        try {
            const response = await fetch('http://192.168.1.145:3002/cart/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        product_id: productId,
                        quantity: quantity
                    }
                )
                });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Unknown server error. Please try again later.');
            }

            if (response.ok) {
                setIsSuccess(true);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addToCart, isLoading, isSuccess, error };
};
