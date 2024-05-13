import { useState } from 'react';

export const PostCart = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false);

    const addToCart = async (productId, quantity) => {
        setIsLoading(true);
        setError(null);

        // Retrieve token from storage
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;
        
        // Attempt to add to cart
        try {
            const response = await fetch('https://onlineshopfullstackproject-production.up.railway.app/cart/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Attach token in header for authentication
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        product_id: productId,
                        quantity: quantity
                    }
                )
                });

            // Handle unsuccessful fetch
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Unknown server error. Please try again later.');
            }

            // Handle successful fetch
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
