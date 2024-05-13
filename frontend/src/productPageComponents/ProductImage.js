const ProductImage = ( {product} ) => {
    return (
        <div className="col-md-3 d-flex justify-content-center align-items-center p-0">
            <div className="image-container" style={{ width: '300px', height: '300px' }}>
                <img 
                    src={product.image_url} 
                    className="img-fluid d-block mx-auto" 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                    alt={product.name} 
                />
            </div>
        </div>
    )
};

export default ProductImage;