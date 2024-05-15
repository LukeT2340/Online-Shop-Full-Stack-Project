import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import '../styles/ProductBuy.css';
import { PostCart } from '../hooks/PostCart.js';

const ProductBuy = ({ product }) => {
    const { user } = useAuthContext();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { addToCart, isLoading, isSuccess, error } = PostCart();

    // Handle quantity change
    const handleQuantityChange = (value) => {
        // Ensure quantity is within bounds (minimum: 1, maximum: product.quantity_available)
        const newQuantity = Math.min(Math.max(quantity + value, 1), product.quantity_available);
        setQuantity(newQuantity);
    };

    // Handle add to cart
    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await addToCart(product.id, quantity);
            // Handle success, maybe show a message or redirect
        } catch (error) {
            // Handle error, maybe show an error message
        }
    }    


    // Handle buy now
    const handleBuyNow = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
    }

    return (
        <div className="card col-md-3 justify-content-top align-items-center">
                <div className="container mb-5">
                {product.quantity_available > 0 ? (
                    <form> 
                    <p className="card-text font-weight-bold mt-2 mb-0">One-time-purchase: </p>
                    <p className="card-text font-weight-bold m-0">${product.price}</p>
                    <p className="card-text text-success py-2 m-0">In stock: {product.quantity_available}</p>
                        <div className="input-group w-100 mx-auto d-flex quantity-selector ">
                            <button type="button" className="btn quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
                            <input type="text" className="form-control text-center quantity-display bg-white" value={`Quantity: ${quantity}`} readOnly />
                            <button type="button" className="btn quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
                        </div>                    
                        <button type="submit" className="btn w-100 py-1 my-2 add-to-cart-button" onClick={handleAddToCart}  disabled={isLoading || isSuccess}>{isSuccess ? "Added to cart" : "Add to Cart"}</button>
                        <button type="submit" className="btn w-100 py-1 m-0 buy-now-button" onClick={handleBuyNow} disabled={isLoading || isSuccess}>Buy Now</button>
                        {error && (
                        <div className="alert alert-warning" role="alert">
                            {error}
                        </div>
                        )}
                    </form>
                ) : (
                    <p className="card-text mb-2 text-muted">Out of stock</p>
                )}
            </div>
        </div>
    );
};

export default ProductBuy;
