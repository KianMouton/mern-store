import Navbar from './navbar.js'
import FrontPage from './front-page.js';
import Products from './products.js';

function Main() {
    return (
      <div className="App">
         <Navbar />
         <FrontPage />
         <Products />
      </div>
    );
}

export default Main;