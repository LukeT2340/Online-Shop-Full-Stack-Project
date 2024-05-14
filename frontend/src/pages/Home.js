import React, { useEffect } from 'react';
import Featured from '../homePageComponents/Featured.js';
import { GetCategories } from '../hooks/GetCategories.js';
import CategoryPreview from '../homePageComponents/CategoryPreview.js';

const Home = () => {
    const { getCategories, categories, isLoading, error } = GetCategories();

    useEffect(() => {
        getCategories(8);
    }, []);

    return (
        <div className="container">
            <Featured />
            <hr className="my-4" />
            {categories && categories.map((category, index) => (
                <React.Fragment key={category.id}>
                    <CategoryPreview category={category} />
                    {index !== categories.length - 1 && <hr className="my-4" />} 
                </React.Fragment>
            ))}
        </div>
    );
}

export default Home;
