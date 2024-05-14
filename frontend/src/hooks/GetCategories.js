import { useState } from 'react';

export const GetCategories = () => {
    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const getCategories = async(limit) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/get?limit=${limit}`, {
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
            setCategories(json);
            setIsLoading(false);
        }
    }

    return { getCategories, categories, isLoading, error };
};
