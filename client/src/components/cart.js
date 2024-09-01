import { useContext, useState } from 'react';
import { CartContext } from './cartContext.js';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const [selectedSizes, setSelectedSizes] = useState({}); // State to track selected sizes

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

    const handleSizeChange = (itemId, size) => {
        setSelectedSizes((prevSizes) => ({
            ...prevSizes,
            [itemId]: size,
        }));
    };

    //check if all sizes are selected
    const areAllTshirtsWithSize = () => {
        return Object.values(cartItems).every(item => {
            return item.type !== "T-shirts" || (item.type === "T-shirts" && item.size);
        });
    };

    const handlePayment = async () => {
        //check if user has sizes selected for shirts
        if (!areAllTshirtsWithSize()) {
            alert("Please select a size for all T-shirts before proceeding to payment.");
            return;
        }
        // Calculate total amount from cart items
        const totalAmount = Object.values(cartItems).reduce((total, item) => {
            let itemPrice = item.price
            if (item.type === "T-shirts" && ['4XL', '5XL'].includes(item.size)) {
                itemPrice = 200; // Set price to R200 for 4XL and 5XL
            }
            return total + (itemPrice * (item.quantity || 1)); // Assuming price is in ZAR
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
                    products: cartItems
                }),
            });

            const data = await response.json();
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl; // Redirect to Yoco checkout
            } else {
                console.error('Payment initiation failed:', data);
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
        <div>
            <button className='product-btn'
            onClick={handlePayment}
            disbaled={!areAllTshirtsWithSize()}
            >Pay for all</button>
            {Object.keys(cartItems).length === 0 ? (
                <p className='cart-empty'>Your cart is empty</p>
            ) : (
                Object.values(cartItems).map(item => (
                    <div className='cart-item' key={item._id}>
                        <img className='cart-img' src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        {item.type === "T-shirts" && 
                        <div className='size'>
                            <p>Size: {selectedSizes[item._id] || item.size || 'Select Size'}</p>
                            {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'].map(size => (
                                <button 
                                    key={size} 
                                    className='size-btn' 
                                    onClick={() => {
                                        handleSizeChange(item._id, size);
                                        // Update the cart item size in context if needed
                                        item.size = size; // Update size in the item directly
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        }
                        <p>Quantity:</p>
                        <div className='quantity-div'>
                            <button onClick={() => handleLessQuantity(item._id)}>&larr;</button>
                            <p className='quantity'>{item.quantity || 0}</p>
                            <button onClick={() => handleAddQuantity(item._id)}>&rarr;</button>
                        </div>
                        <p>Price: R{['4XL', '5XL'].includes(item.size) ? 200 : item.price}</p>
                        <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;