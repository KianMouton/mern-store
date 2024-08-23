import { useContext } from 'react';
import { CartContext } from './cartContext.js';

const Cart = () => {
    // Accessing the context inside of cartContext.js
    const { cartItems, removeFromCart} = useContext(CartContext);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    // Create a function to calculate the quantity of each item
    const calculateQuantity = (id) => {
        return cartItems.filter(item => item._id === id).length;
    };

    return (
        <div>
            <h1>Cart Page</h1>
            {cartItems.length === 0 ? 
            <p>Your cart is empty</p> : 
            
            cartItems.map(item => (
                <div className='cart-item' key={item._id}>
                    <img className='cart-img' src={item.imageUrl} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>Quantity: {calculateQuantity(item._id)}</p>
                    <p>Price: R{item.price}</p>
                    <button onClick={handleRemoveFromCart}>remove</button>
                </div>
            ))
            }
        </div>
    );
};

export default Cart;