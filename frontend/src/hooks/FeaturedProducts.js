import { useState } from 'react';

export const FeaturedProducts = () => {
    const [featured, setFeatures] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const getFeatured = async(limit) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`http://192.168.1.145:3002/products/featured?limit=${limit}`, {
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
            setFeatures(json);
            setIsLoading(false);
        }
    }

    return { getFeatured, featured, isLoading, error };
};
