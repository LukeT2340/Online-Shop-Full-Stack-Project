import { Product } from '../hooks/Product.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProductInfo from '../productPageComponents/ProductInfo.js';
import ProductImage from '../productPageComponents/ProductImage.js';
import ProductBuy from '../productPageComponents/ProductBuy.js';

const ProductDetails = () => {
    const { getProduct, product, isLoading, error } = Product(); // Fetch product details hook
    const { productId } = useParams();  // Get product ID from URL params

    // Fetch product (using API) when page loads
    useEffect(() => {
        getProduct(productId);
    }, []); 

    return (
        <div className="container pt-3">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {product && (
                <div className="row">
                    <ProductImage product={product} /> 
                    <ProductInfo product={product} />
                    <ProductBuy product={product} />
                </div>
            )}
        </div>
    )
};

export default ProductDetails;