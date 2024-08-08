import Main from './components/mainLayout.js';
import Products from './components/products.js';
import ProductPage from './components/productPage.js';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/products/:id',
    element: <ProductPage />
  }
])

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
