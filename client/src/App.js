import Main from './components/mainLayout.js';
import Navbar from './components/navbar.js';
import Products from './components/products.js';
import ProductPage from './components/productPage.js';
import Cart from './components/cart.js';
import CartProvider from './components/cartContext.js';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <Main />
  },
  {
    path: '/products',
    element: 
    <layout>
      <Navbar />
      <Products />
    </layout>
  },
  {
    path: '/products/:id',
    element:
    <layout>
      <Navbar />
      <ProductPage />
    </layout>
  },
  {
    path: '/cart',
    element: 
    <layout>
      <Navbar />
      <Cart />
    </layout>
  }
])

function App() {
  return (
    <div className="App">
      <CartProvider>
       <RouterProvider router={router} />
      </CartProvider>
    </div>
  );
}

export default App;
