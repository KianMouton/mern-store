import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';

function ProductPage() {

    const [product, setProduct] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getProduct(id)

    }, [id]); // only fetch data when id changes

    const BASE_URL = 'http://localhost:3001';

    const getProduct = async (id) => {
        // fetch product data from backend using id
        const product = await fetch(BASE_URL + '/products/' + id);
        const data = await product.json();
        setProduct(data);
    }

    return (
        <div className='product-page'>
            <h1>Product Page</h1>
            {/* fetch product data from backend */}
            <p>{product.name}</p>
            <img className="product-page-img" src={product.imageUrl} alt={product.name} />
            <p>description</p>
            <p>{product.description}</p>
            <p>Price</p>
            <p>{product.price}</p>
        </div>
    )
}

export default ProductPage;