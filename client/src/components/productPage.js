import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';

function ProductPage() {

    const [product, setProduct] = useState({});
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // add product to cart
        setCart([...cart, product]);
        console.log(cart);
    }

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
            <img className="product-page-img" src={product.imageUrl} alt={product.name} />
            <p className='title'>{product.name}</p>
            <p className='product-page-text'>{product.description}</p>
            <p className='title'>Price</p>
            <p className='product-page-text'>R{product.price}</p>
            <button onClick={() => addToCart(product.name)} className='cart-btn'>Add to Cart</button>
        </div>
    )
}

export default ProductPage;