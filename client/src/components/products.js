import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [type, setType] = useState(undefined);

    useEffect(() => {
        getProducts();
    }, []);

    const BASE_URL = 'http://localhost:3001';

    const getProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            const data = await response.json();
            setProducts(data);
            console.log(response);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch products');
            return [];
        }
    };

    const handleTshirts = () => setType('T-shirts');
    const handleBabyGrows = () => setType('BabyGrows');
    const handleMugs = () => setType('Mugs');
    const handleSqueezies = () => setType('Squeezies');
    const handleAll = () => setType(undefined);

    return (
        <div className='products'>
            <h1>Products</h1>
            <div className='buttons'>
                <button onClick={handleTshirts} className='product-btn'>T-shirts</button>
                <button onClick={handleBabyGrows} className='product-btn'>BabyGrows</button>
                <button onClick={handleMugs} className='product-btn'>Mugs</button>
                <button onClick={handleSqueezies} className='product-btn'>Squeezies</button>
                <button onClick={handleAll} className='product-btn'>All</button>
            </div>
            <div className='products-container'>
                {products
                    .filter(product => type ? product.type === type : true) // Filter logic
                    .map(product => (
                        <Link to={`/products/${product._id}`} key={product._id}> {/* Key on Link */}
                            <div className='product'>
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>R{product.price}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Products;