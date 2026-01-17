import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Checkout
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        address: '',
        city: '',
        zip: '',
        card: '',
        exp: '',
        cvc: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="cart-page success-view">
                <div className="success-card">
                    <div className="success-icon">🎉</div>
                    <h1>Order Confirmed!</h1>
                    <p>Thank you for your purchase, {formData.name.split(' ')[0]}!</p>
                    <p>We've sent a confirmation email to {formData.email}.</p>
                    <Link to="/">
                        <Button variant="primary" size="lg">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0 && !isSuccess) {
        return (
            <div className="cart-page empty-view">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any treats yet.</p>
                <Link to="/shop">
                    <Button variant="primary">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="page-title">{checkoutStep === 1 ? 'Shopping Cart' : 'Checkout'}</h1>

                <div className="cart-layout">
                    {/* Main Content */}
                    <div className="cart-main">
                        {checkoutStep === 1 ? (
                            // Step 1: Cart Items
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.type}`} className="cart-item">
                                        <img src={item.image} alt={item.name} className="cart-item-image" />

                                        <div className="cart-item-details">
                                            <h3>{item.name}</h3>
                                            {item.type === 'subscribe' && <span className="sub-badge">Subscription (Save 10%)</span>}
                                            <p className="item-price">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="cart-item-actions">
                                            <div className="qty-selector-sm">
                                                <button onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}><Minus size={14} /></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}><Plus size={14} /></button>
                                            </div>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(item.id, item.type)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Step 2: Checkout Form
                            <div className="checkout-form-container">
                                <form id="checkout-form" onSubmit={handleCheckout}>
                                    <div className="form-section">
                                        <h3>Contact Information</h3>
                                        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} className="input-field" />
                                    </div>

                                    <div className="form-section">
                                        <h3>Shipping Address</h3>
                                        <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleInputChange} className="input-field" />
                                        <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleInputChange} className="input-field" />
                                        <div className="form-row">
                                            <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} className="input-field" />
                                            <input type="text" name="zip" placeholder="ZIP Code" required value={formData.zip} onChange={handleInputChange} className="input-field" />
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3>Payment</h3>
                                        <div className="secure-badge"><Lock size={12} /> SSL Secure</div>
                                        <input type="text" name="card" placeholder="Card Number" required value={formData.card} onChange={handleInputChange} className="input-field" />
                                        <div className="form-row">
                                            <input type="text" name="exp" placeholder="MM/YY" required value={formData.exp} onChange={handleInputChange} className="input-field" />
                                            <input type="text" name="cvc" placeholder="CVC" required value={formData.cvc} onChange={handleInputChange} className="input-field" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Summary */}
                    <div className="cart-sidebar">
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{cartTotal > 50 ? 'Free' : '$5.99'}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (Est.)</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${(cartTotal + (cartTotal > 50 ? 0 : 5.99) + (cartTotal * 0.08)).toFixed(2)}</span>
                            </div>

                            {checkoutStep === 1 ? (
                                <Button
                                    className="w-full mt-4"
                                    size="lg"
                                    onClick={() => setCheckoutStep(2)}
                                >
                                    Proceed to Checkout
                                </Button>
                            ) : (
                                <Button
                                    className="w-full mt-4"
                                    size="lg"
                                    variant="primary" // Ensure distinct checkout button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Processing...' : `Pay $${(cartTotal + (cartTotal > 50 ? 0 : 5.99) + (cartTotal * 0.08)).toFixed(2)}`}
                                </Button>
                            )}

                            {checkoutStep === 2 && (
                                <button className="back-to-cart-link" onClick={() => setCheckoutStep(1)}>
                                    Return to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
