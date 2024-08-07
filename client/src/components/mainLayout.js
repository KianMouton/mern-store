import Navbar from './navbar.js'
import FrontPage from './front-page.js';
import Products from './products.js';
import Footer from './footer.js';

function Main() {
    return (
      <div className="App">
         <Navbar />
         <FrontPage />
         <Products />
         <Footer />
      </div>
    );
}

export default Main;