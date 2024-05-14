import { useEffect } from 'react';
import { GetCart } from '../hooks/GetCart';
import CartEntry from '../cartPageComponents/CartEntry';
import { Product } from '../hooks/Product';

const Cart = () => {
    const { getCart, cartEntries, isLoading, error } = GetCart(); // GetCart hook

    // Fetch cart (using API) when page loads
    useEffect(() => {
        getCart();
    }, []); 
    return (
        <div className='container justify-content-center align-items-center'>
            <div className="row d-flex mb-3 align-items-center">
                <h6 className="mr-auto ml-3 mt-auto mb-auto" style={{ fontSize: '1.3rem', color: '#333' }}>My cart</h6>
                {isLoading && <p>Loading...</p>}
                {!isLoading && error && <p>Error: {error}</p>}
                {!isLoading && !error && cartEntries && (
                    <button type="submit" className="btn buy-now-button ml-auto mr-3" disabled={cartEntries.length === 0}>Checkout</button>
                )}
            </div>
            {cartEntries && cartEntries.length === 0 && (
                <h6>Cart is empty</h6>
            )}
                {cartEntries && cartEntries.map((item) => (
                    <CartEntry key={item.product_id} item={item} />
                ))}
        </div>
    )
}

export default Cart