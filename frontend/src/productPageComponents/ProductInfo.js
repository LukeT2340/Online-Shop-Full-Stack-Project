const ProductInfo = ( {product} ) => {
    return (
        <div className="col-md-6">
            <div className="card-body pt-0">
                <h3 className="card-title">{product.name}</h3>
                <div className=" d-flex">
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
                <div className="d-flex align-items-center">
                    <p className="card-text mr-2" style={{ marginBottom: '0', 'font-size': '18px' }}>${product.price}</p>
                    {product.price < product.old_price && (
                        <p className="card-text text-muted mb-0" style={{ 'font-size': '14px' }}><del>${product.old_price}</del></p>
                    )}
                </div>
                <p className="card-text">{product.description}</p>
            </div>
        </div>
    )
}

export default ProductInfo;