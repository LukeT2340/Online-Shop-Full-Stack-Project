import { useState } from 'react';

export const GetCategoryProducts = () => {
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const getCategoryProducts = async(category_id, limit) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/category?category_id=${category_id}&limit=${limit}`, {
        method: 'GET',
        });

        // Handle unsuccessful fetch
        if (!response.ok) {
            const errorData = await response.json();
            setIsLoading(false);
            setError(errorData.errorMessage || 'Unknown server error. Please try again later.');
        }

        // Handle successful fetch
        if (response.ok) {
            const json = await response.json();
            setProducts(json);
            setIsLoading(false);
        }
    }

    return { getCategoryProducts, products, isLoading, error };
};
