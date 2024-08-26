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

    const addToCart = (item) => {
        setCartItems((prevItems) => ({
            ...prevItems,
            [item._id]: {
                ...item,
                quantity: (prevItems[item._id]?.quantity || 0) + 1,
            },
        }));
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
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;