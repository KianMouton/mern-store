import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect} from 'react';
// font awesome for cart icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from  '@fortawesome/free-solid-svg-icons';


const Navbar = () => {

    useEffect(() => {
        gsap.from('.nav-link', { duration: 0.2, y: -50, opacity: 0, stagger: 0.2 });
        gsap.to('.nav-link', { duration: 0.7, y: 0, opacity: 1, stagger: 0.2 });

    }, []);

    return (
        <nav className='navbar'>
            <Link to='/' className='nav-link'><p>What I do</p></Link>
            <Link to='/products' className='nav-link'><p>Products</p></Link>
            <Link to='/' className='nav-link'><p>Contact</p></Link>
            <Link to='/cart' className='nav-link'><FontAwesomeIcon icon={faCartShopping} /></Link>
        </nav>
    );
}

export default Navbar;