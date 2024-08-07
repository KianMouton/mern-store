import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className='navbar'>
            <p>What I do</p>
            <Link to='/products' className='nav-link'><p>Products</p></Link>
            <p>Contact</p>
        </nav>
    );
}

export default Navbar;