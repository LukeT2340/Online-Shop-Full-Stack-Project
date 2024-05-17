import { useProduct } from '../hooks/useProduct';
import { useParams } from 'react-router-dom';
import ProductInfo from '../productPageComponents/ProductInfo.js';
import ProductImage from '../productPageComponents/ProductImage.js';
import ProductBuy from '../productPageComponents/ProductBuy.js';

const ProductDetails = () => {
    const { productId } = useParams();  // Get product ID from URL params
    const { product, isLoading, error } = useProduct(productId);

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