import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';


function Footer() {
    return (
        <div className="footer">
            <p>follow me on my socials</p>
            <div className='icons'>   
             <a href="https://www.facebook.com/profile.php?id=100078638864939">  
             <FontAwesomeIcon icon={faFacebook} size='2x' />
             </a>
             <FontAwesomeIcon icon={faInstagram} size='2x' />
            </div>
        </div>
    )
}

export default Footer;