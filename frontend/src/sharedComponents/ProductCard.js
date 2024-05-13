import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ( {product} ) => {
    return (
        <div key={product.id} className="4 pt-0 pb-2 my-0 col-lg-2"> 
            <div className="card h-100 px-0 py-0 pt-0 pb-2 d-flex" style={{ backgroundColor: '#fbfbfb' }}> 
                <img src={product.image_url} className="card-img-left img-fluid" alt={product.name} style={{ height: '250px', backgroundColor: 'white', objectFit: 'contain' }} />
                <div className="card-body px-1 py-0 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center">
                        <p className="card-text mr-2" style={{ marginBottom: '0', 'font-size': '18px' }}>${product.price}</p>
                        {product.price < product.old_price && (
                            <p className="card-text text-muted mb-0" style={{ 'font-size': '14px' }}><del>${product.old_price}</del></p>
                        )}
                    </div>
                    <div className="card-name">
                        <Link className="card-title text-decoration-none text-dark" to={`/product/${product.id}`}>{product.name}</Link>
                    </div>
                                        
                    <div className="row align-items-center mt-3" style={{ fontSize: '0.75rem' }}>
                        <div className="col-auto d-flex align-items-center">
                            <div className="star-rating">
                                {[...Array(Math.floor(product.rating))].map((_, index) => (
                                    <span key={index} className="star" style={{ color: 'orange' }}>&#9733;</span>
                                ))}
                                {product.rating % 1 !== 0 && (
                                    <span className="star" style={{ color: 'orange', clipPath: `inset(0 ${100 - product.rating % 1 * 100}% 0 0)` }}>
                                        &#9733;
                                    </span>
                                )}
                            </div>
                            <div className="ml-0">
                                <p className="text-left mb-0">({product.num_of_reviews})</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;