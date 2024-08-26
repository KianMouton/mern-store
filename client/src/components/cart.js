import { useContext } from 'react';
import { CartContext } from './cartContext.js';

const Cart = () => {
    // Accessing the context inside of cartContext.js
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const handleAddQuantity = (itemId) => {
        updateQuantity(itemId, (cartItems[itemId].quantity || 0) + 1);
    };

    const handleLessQuantity = (itemId) => {
        const currentQuantity = cartItems[itemId].quantity || 0;
        if (currentQuantity === 1) {
            return; // Do nothing if quantity is already 1
        }
        updateQuantity(itemId, currentQuantity - 1);
    };

    return (
        <div>
            <h1>Cart Page</h1>
            {Object.keys(cartItems).length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                Object.values(cartItems).map(item => (
                    <div className='cart-item' key={item._id}>
                        <img className='cart-img' src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>Quantity:</p>
                        <div className='quantity-div'>
                            <button onClick={() => handleLessQuantity(item._id)}>&larr;</button>
                            <p className='quantity'>{item.quantity || 0}</p>
                            <button onClick={() => handleAddQuantity(item._id)}>&rarr;</button>
                        </div>
                        <p>Price: R{item.price}</p>
                        <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;