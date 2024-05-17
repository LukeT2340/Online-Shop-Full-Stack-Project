import { useState, useEffect } from 'react';

export const useCategoryProducts = (category_id, limit) => {
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/category?category_id=${category_id}&limit=${limit}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.errorMessage || 'Unknown server error. Please try again later.');
                }

                const json = await response.json();
                setProducts(json);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryProducts();

    }, [category_id, limit]);

    return { products, isLoading, error };
};
