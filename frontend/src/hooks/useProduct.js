import { useState, useEffect } from 'react';

export const useProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/getOne?id=${id}`, {
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

        // Call getProduct when the component mounts
        getProduct();

    }, []); // Empty dependency array ensures that it only runs once when the component mounts

    return { product, isLoading, error };
};
