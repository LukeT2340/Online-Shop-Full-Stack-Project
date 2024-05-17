import { useEffect, useState } from 'react';

// This hook uses the search API to search for products
export const useSearch = (text) => {
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const search = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/search/?text=${text}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.errorMessage || 'Unknown server error. Please try again later.');
                }

                const json = await response.json();
                console.log(json)
                setResults(json);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        // Run the search whenever text changes
        search();
    }, [text]);

    return { results, isLoading, error };
};
