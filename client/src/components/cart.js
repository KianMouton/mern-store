import { useContext } from 'react';
import { CartContext } from './cartContext.js';

const Cart = () => {
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

    const handlePayment = async () => {
        // Calculate total amount from cart items
        const totalAmount = Object.values(cartItems).reduce((total, item) => {
            return total + (item.price * (item.quantity || 1)); // Assuming price is in ZAR
        }, 0);

        try {
            const response = await fetch('http://localhost:3001/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalAmount * 100, // Convert to cents if necessary
                    currency: 'ZAR',
                }),
            });

            const data = await response.json();
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;; // Redirect to Yoco checkout
            } else {
                console.error('Payment initiation failed:', data);
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
        <div>
            <button className='product-btn' onClick={handlePayment}>Pay for all</button>
            {Object.keys(cartItems).length === 0 ? (
                <p className='cart-empty'>Your cart is empty</p>
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