import { Link } from 'react-router-dom';
import { useEffect, useState } from  'react';

const Products = () => {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        getProducts();
        
    }, []); 

    const BASE_URL = 'http://localhost:3001';

    const getProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`)
            const data = await response.json();
            setProducts(data);

            console.log(response);
        }
        catch(err) {
            console.error(err);
            alert('Failed to fetch products');
            return [];
        } 
    }

    return (
        <div>
        <div className='products'>
            <h1>Products</h1>
            {products.map((product) => {
                return (
                    <Link to={`/products/${product._id}`}>
                    <div key={product._id} className='product'>
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>R{product.price}</p>
                    </div>
                    </Link>
                )
            })}
            <Link to='/products'><button className='load-more'>Load More</button></Link>
        </div>
        </div>
    )
}

export default Products;