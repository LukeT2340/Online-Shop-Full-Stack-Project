import { useState } from 'react';

export const GetCart = () => {
    const [cartEntries, setCartEntries] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    // Merges cart entries that are of the same product
    const mergeCartEntries = (cartEntries) => {
        // Create an object to store merged cart entries
        let mergedCart = {};
    
        // Iterate over each cart entry
        cartEntries.forEach(entry => {
            if (entry.product_id in mergedCart) {
                mergedCart[entry.product_id].quantity += entry.quantity;
            } else {
                mergedCart[entry.product_id] = { ...entry }; 
            }
        });
    
        // Convert mergedCart object back to array
        return Object.values(mergedCart);
    };
    

    // Fetches cart using API
    const getCart = async() => {
        setIsLoading(true);
        setError(null);

        // Retrieve token from storage
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        // Attempt to retrieve cart
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/get`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Attach token in header for authentication
                'Content-Type': 'application/json'
            }
            });

            // Handle unsuccessful fetch
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Unknown server error. Please try again later.');
            }

            // Handle successful fetch
            if (response.ok) {
                const json = await response.json();
                const cartEntries = mergeCartEntries(json);
                setCartEntries(cartEntries);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }

    }

    return { getCart, cartEntries, isLoading, error };
};
