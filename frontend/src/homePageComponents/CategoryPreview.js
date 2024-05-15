import ProductCard from '../sharedComponents/ProductCard.js';
import React, { useEffect } from 'react';
import { GetCategoryProducts } from '../hooks/GetCategoryProducts.js';
import { Link } from 'react-router-dom';

const CategoryPreview = ( {category} ) => {
    const { getCategoryProducts, products, isLoading, error } = GetCategoryProducts();

    useEffect(() => {
        getCategoryProducts(category.id, 6);
    }, []);

    return (
        <div className='col p-0 m-0'>
            { products && products.length > 0 && (
                <>
                <hr className="my-4" />

            <div className="row mx-3 mt-3">
                <h6 style={{ fontSize: '1.3rem', color: '#333' }}>{category.name}</h6>
                <Link className="ml-auto" to={`/${category.name}`}>See all</Link>
            </div>
            <div className="row p-0 m-0">
                {isLoading ? (
                    <div className="col">
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <div className="col">
                        <p>Error: {error}</p>
                    </div>
                ) : products ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col">
                        <p>No {category.name} products available</p>
                    </div>
                )}
            </div>
            </>
            )}
        </div>
    )
}

export default CategoryPreview;