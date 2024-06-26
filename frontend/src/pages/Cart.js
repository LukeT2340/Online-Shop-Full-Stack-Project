import { useCart } from '../hooks/useCart';
import CartEntry from '../cartPageComponents/CartEntry';

const Cart = () => {
    const { cartEntries, isLoading, error } = useCart();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container justify-content-center align-items-center mt-3'>
            <div className="row d-flex mb-3 align-items-center mx-3">
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