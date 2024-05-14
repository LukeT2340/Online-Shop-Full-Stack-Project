import { Product } from '../hooks/Product.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RemoveFromCart } from '../hooks/RemoveFromCart.js';
import { UpdateCartQuantity } from '../hooks/UpdateCartQuantity.js';

const CartEntry = ( {item} ) => {
    const { getProduct, product, isLoading, error } = Product(); // Fetch product details hook
    const [ quantity, setQuantity ] = useState(item.quantity);
    const { removeFromCart, isDeleted } = RemoveFromCart();
    const { updateCartQuantity, isSuccess } = UpdateCartQuantity();

    // Fetch product (using API) when page loads
    useEffect(() => {
        getProduct(item.product_id);
    }, []); 

    // Handle quantity change
    const handleQuantityChange = async (newQuantity) => {
        setQuantity(newQuantity) // Update it locally
        await updateCartQuantity(item.product_id, newQuantity);
    }

    // Remove entry from cart
    const removeEntry = async () => {
        await removeFromCart(item.product_id);
        window.location.reload(); 
    }

    return (
        <>
            {product && !isDeleted && (
                <div className="row d-flex border rounded mb-3 align-items-center">
                    <img 
                        src={product.image_url} 
                        className="img-fluid col-md-2 py-2" 
                        style={{ objectFit: "contain", maxHeight: "200px"}} 
                        alt={product.name} 
                    />



                    <div className="col-md-8 d-flex flex-column r align-items-center pt-3">
                        <Link to={`/product/${product.id}`} style={{ color: 'black', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', 'white-space': 'nowrap' }}>
                            {product.name}
                        </Link>
                        <div className="container mt-auto">
                            <div className="row justify-content-between pt-3">
                                <p>${product.price} each</p>
                                <p className="font-weight-bold">Net: ${(quantity * product.price).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 p-3 d-flex flex-column justify-content-center align-items-center">
                        <div className="input-group my-3">
                            <select 
                                className="form-control text-center quantity-dropdown bg-white" 
                                value={quantity} 
                                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                            >
                                {/* Generate options dynamically based on available quantity */}
                                {Array.from({ length: product.quantity_available }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                        <button className='btn btn-sm btn-warning mt-2' onClick={removeEntry}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Remove
                        </button>
                    </div>

                </div>
        )}
        </>
    )
}

export default CartEntry;