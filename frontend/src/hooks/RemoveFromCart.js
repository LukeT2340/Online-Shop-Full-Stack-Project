import { useState } from 'react';

export const RemoveFromCart = () => {
    const [isDeleted, setIsDeleted] = useState(false);

    // Removes product from cart using API
    const removeFromCart = async(productId) => {
        // Retrieve token from storage
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        // Attempt to retrieve cart
        try {
            const response = await fetch(`http://onlineshopfullstackproject-production.up.railway.app/cart/removeEntry`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Attach token in header for authentication
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    product_id: productId,
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
                setIsDeleted(true)
            }
        } catch (error) {
            console.log(error);
        } 

    }

    return { removeFromCart, isDeleted };
};
