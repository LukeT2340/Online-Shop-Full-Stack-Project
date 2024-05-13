import { useState } from 'react';

export const UpdateCartQuantity = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    // Removes product from cart using API
    const updateCartQuantity = async(productId, newQuantity) => {
        
        // Retrieve token from storage
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        // Attempt to retrieve cart
        try {
            const response = await fetch(`http://192.168.1.145:3002/cart/updateItemQuantity`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Attach token in header for authentication
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    product_id: productId,
                    new_quantity: newQuantity
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
                setIsSuccess(true)
            }
        } catch (error) {
            console.log(error);
        } 

    }

    return { updateCartQuantity, isSuccess };
};
