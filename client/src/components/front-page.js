import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import chubbySugarLogo  from '../logo/chubby-sugar-logo.jpg';
import { gsap } from 'gsap';
import SplitText from 'split-text-js'; 
gsap.registerPlugin(SplitText);

const FrontPage = () => {
    useEffect(() => {
        //animation for the the text array
        const titles = gsap.utils.toArray('.text-wrapper p'); 
        const tl = gsap.timeline({ repeat: -1 });

        titles.forEach((title) => {
            const splitTitle = new SplitText(title); 

            tl.from(splitTitle.chars, {
                opacity: 0,
                y: 10,
                rotateX: -90,
                stagger: .02, 
            }, "<") 

            .to(splitTitle.chars, {
                opacity: 0,
                y: -10,
                rotateX: 90,
                stagger: .02, 
            }, "<1"); 
        });
        
    }, []); 

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
        <div className='front-page'>
            <div className='text'>
                <h1>Get custom made </h1>
                <div className='text-wrapper'>
                    <p>T-Shirts</p>
                    <p>Mugs</p>
                    <p>Squeezies</p>
                    <p>BabyGrows</p>
                    <p>Anything</p>
                </div>
                <p className='description'>Chubby Sugar creates custom clothing
                    that transforms your designs into a reality.
                </p>
            </div>
            <div className='front-image'>
                <img className='logo' src={chubbySugarLogo} alt='chubby sugar logo' />
            </div>
            </div>
            <div>
        <div className='products'>
            <h1>Products</h1>
            <div className='products-container'>
            {products.slice(0, 3).map((product) => {
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
            </div>
            <Link to='/products'><button className='load-more'>see all</button></Link>
        </div>
        </div>
            </div>
            
    );
}

export default FrontPage;
