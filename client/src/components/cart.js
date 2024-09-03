import { useContext, useState } from 'react';
import { CartContext } from './cartContext.js';
import Modal from './modal.js'; // Import the Modal component

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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

    const areAllSizesSelected = () => {
        return Object.values(cartItems).every(item => {
            if (item.type === "T-shirts" || item.type === "BabyGrows") {
                return item.size || selectedSizes[item._id]; // Check if size is selected for T-shirts and BabyGrows
            } else {
                return true; // Allow other product types to pass the check
            }
        });
    };

    const handlePayment = () => {
        if (!areAllSizesSelected()) {
            alert("Please select a size for all T-shirts and BabyGrows before proceeding to payment.");
            return;
        }
        setIsModalOpen(true); // Open the modal to collect contact info
    };

    const handleModalSubmit = async (contactInfo) => {
        // Calculate total amount from cart items
        const totalAmount = Object.values(cartItems).reduce((total, item) => {
            let itemPrice = item.price;
            if (item.type === "T-shirts" && ['4XL', '5XL'].includes(item.size || selectedSizes[item._id])) {
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
                    amount: totalAmount * 100, // Convert to cents
                    currency: 'ZAR',
                    products: cartItems,
                    contactInfo: contactInfo // Send contact info to the server
                }),
            });

            const data = await response.json();
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl; // Redirect to payment
            } else {
                console.error('Payment initiation failed:', data);
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
        setIsModalOpen(false); // Close the modal after processing payment
    };

    // Size options for T-shirts and BabyGrows
    const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
    const babyGrowSizes = ['0-3 Months', '3-6 Months', '6-12 Months', '12-18 Months', '18-24 Months'];

    return (
        <div>
            <button className='pay-btn' onClick={handlePayment} disabled={!areAllSizesSelected()}>
                Pay for all
            </button>
            {Object.keys(cartItems).length === 0 ? (
                <p className='cart-empty'>Your cart is empty</p>
            ) : (
                Object.values(cartItems).map(item => (
                    <div className='cart-item' key={item._id}>
                        <img className='cart-img' src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        {/* Render size selection only for T-shirts and BabyGrows */}
                        {(item.type === "T-shirts" || item.type === "BabyGrows") && 
                        <div className='size'>
                            <p>Size: {selectedSizes[item._id] || item.size || 'Select Size'}</p>
                            {item.type === "T-shirts" && tshirtSizes.map(size => (
                                <button 
                                    key={size} 
                                    className='size-btn' 
                                    onClick={() => {
                                        handleSizeChange(item._id, size);
                                        item.size = size; // Update size in the item directly
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                            {item.type === "BabyGrows" && babyGrowSizes.map(size => (
                                <button 
                                    key={size} 
                                    className='size-btn' 
                                    onClick={() => {
                                        handleSizeChange(item._id, size);
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
                        <p>Price: R{['4XL', '5XL'].includes(item.size || selectedSizes[item._id]) ? 200 : item.price}</p>
                        <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                    </div>
                ))
            )}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleModalSubmit} 
            />
        </div>
    );
};

export default Cart;