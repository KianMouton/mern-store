import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        // Load cart items from local storage if available
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    useEffect(() => {
        // Save cart items to local storage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item, size) => {
        const existingItem = cartItems[item._id];
        if (existingItem) {
            // Update quantity and size if item already exists
            existingItem.quantity += 1;
            existingItem.size = size; // Update size
        } else {
            // Add new item with size
            cartItems[item._id] = { ...item, quantity: 1, size: size };
        }
        setCartItems({ ...cartItems });
    };

    const addToBabyGrow = (item, size) => {
        const existingItem = cartItems[item._id];
        if (existingItem) {
            // Update quantity and size if item already exists
            existingItem.quantity += 1;
            existingItem.size = size; // Update size
        } else {
            // Add new item with size
            cartItems[item._id] = { ...item, quantity: 1, size: size };
        }
        setCartItems({ ...cartItems });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            delete updatedItems[itemId];
            return updatedItems;
        });
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevItems) => ({
            ...prevItems,
            [itemId]: {
                ...prevItems[itemId],
                quantity,
            },
        }));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, addToBabyGrow, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;