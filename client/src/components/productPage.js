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
            {/* fetch product data from backend */}
            <h1>{product.name}</h1>
            <img className="product-page-img" src={product.imageUrl} alt={product.name} />
            <p className='title'>description</p>
            <p>{product.description}</p>
            <p className='title'>Price</p>
            <p>R{product.price.toFixed(2)}</p>
        </div>
    )
}

export default ProductPage;