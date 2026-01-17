import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load from local storage on initial render
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // Save to local storage whenever cart changes
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, type = 'one-time') => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id && item.type === type);

            if (existingItem) {
                return prevItems.map(item =>
                    (item.id === product.id && item.type === type)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, {
                    ...product,
                    quantity,
                    type,
                    // Applies 10% discount if subscription
                    price: type === 'subscribe' ? product.price * 0.9 : product.price
                }];
            }
        });
        // Optional: Open cart or show toast
    };

    const removeFromCart = (id, type) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.type === type)));
    };

    const updateQuantity = (id, type, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                (item.id === id && item.type === type)
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
