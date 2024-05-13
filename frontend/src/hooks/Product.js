import { useState } from 'react';

export const Product = () => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    const getProduct = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://onlineshopfullstackproject-production.up.railway.app/products/getOne?id=${id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Unknown server error. Please try again later.');
            }

            const json = await response.json();
            setProduct(json);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { getProduct, product, isLoading, error };
};
