import Navbar from './components/navbar.js'
import FrontPage from './components/front-page.js';
import Products from './components/products.js';
import './App.css';

function App() {
  return (
    <div className="App">
       <Navbar />
       <FrontPage />
       <Products />
    </div>
  );
}

export default App;
