import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ChevronDown, ChevronUp, ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const product = PRODUCTS.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    const [purchaseType, setPurchaseType] = useState('one-time');

    // Gallery State
    const [selectedImage, setSelectedImage] = useState(product?.image);

    useEffect(() => {
        if (product) setSelectedImage(product.image);
    }, [product]);

    const [expandedSection, setExpandedSection] = useState(null);

    // Reviews State
    const [reviews, setReviews] = useState([
        { id: 1, name: "Sarah M.", date: "2 months ago", rating: 5, text: "Absolutely love this! My dog's coat is so shiny now." },
        { id: 2, name: "Mike R.", date: "1 month ago", rating: 4, text: "Great product, but the scent is a bit strong for me." }
    ]);
    const [newReview, setNewReview] = useState({ rating: 5, text: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setReviews([...reviews, {
                id: Date.now(),
                name: "Guest User",
                date: "Just now",
                rating: newReview.rating,
                text: newReview.text
            }]);
            setNewReview({ rating: 5, text: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return <div className="loading">Loading...</div>;
    }

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const discountedPrice = (product.price * 0.9).toFixed(2);

    const handleAddToCart = () => {
        addToCart(product, quantity, purchaseType);
    };

    return (
        <div className="product-details-page">
            <div className="pd-container">
                {/* Header */}
                <div className="pd-header">
                    <Link to="/shop" className="back-link"><ArrowLeft size={16} /> Back to Shop</Link>
                </div>

                <div className="pd-grid">
                    {/* Gallery Column */}
                    <div className="pd-gallery">
                        <div className="main-image-container">
                            <img src={selectedImage} alt={product.name} className="main-image" />
                            <button className="pd-wishlist-btn" title="Add to Wishlist">
                                <Heart size={20} />
                            </button>
                        </div>
                        <div className="pd-thumbnails">
                            <div
                                className={`thumbnail ${selectedImage === product.image ? 'active' : ''}`}
                                onClick={() => setSelectedImage(product.image)}
                            >
                                <img src={product.image} alt={product.name} />
                            </div>
                            {/* Mock thumbnails if array existed */}
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className="pd-info">
                        <h1 className="pd-title">{product.name}</h1>

                        <div className="pd-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "#F59E0B" : "none"} color="#F59E0B" />
                                ))}
                            </div>
                            <span className="review-count">{product.reviews} reviews</span>
                        </div>

                        <div className="pd-price-section">
                            <span className="pd-price">${product.price.toFixed(2)}</span>
                            {product.tag && <Badge variant="accent">{product.tag}</Badge>}
                        </div>

                        <p className="pd-description">{product.description || "Experience the finest gentle care for your pet. Made with organic ingredients and vet-approved formulas."}</p>

                        {/* Purchase Options */}
                        <div className="purchase-options">
                            <label className={`option-card ${purchaseType === 'subscribe' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="purchaseType"
                                    checked={purchaseType === 'subscribe'}
                                    onChange={() => setPurchaseType('subscribe')}
                                />
                                <div className="option-content">
                                    <span className="option-title">Subscribe & Save</span>
                                    <span className="option-price">${discountedPrice}</span>
                                </div>
                                <Badge variant="success" className="save-badge">Save 10%</Badge>
                            </label>

                            <label className={`option-card ${purchaseType === 'one-time' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="purchaseType"
                                    checked={purchaseType === 'one-time'}
                                    onChange={() => setPurchaseType('one-time')}
                                />
                                <div className="option-content">
                                    <span className="option-title">One-time Purchase</span>
                                    <span className="option-price">${product.price.toFixed(2)}</span>
                                </div>
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="pd-actions">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
                            </div>
                            <Button size="lg" className="add-to-cart-btn" variant="accent" onClick={handleAddToCart}>
                                <ShoppingCart size={20} style={{ marginRight: '8px' }} />
                                Add to Cart — ${(purchaseType === 'subscribe' ? discountedPrice * quantity : product.price * quantity).toFixed(2)}
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pd-trust">
                            <div className="trust-item">
                                <Sparkles className="text-teal" size={20} />
                                <span>100% Natural</span>
                            </div>
                            <div className="trust-item">
                                <ShieldCheck className="text-blue" size={20} />
                                <span>Vet Approved</span>
                            </div>
                            <div className="trust-item">
                                <Truck className="text-orange" size={20} />
                                <span>Fast Delivery</span>
                            </div>
                        </div>

                        {/* Accordions */}
                        <div className="pd-accordions">
                            <div className="accordion-item">
                                <button className="accordion-header" onClick={() => toggleSection('description')}>
                                    <span>Product Description</span>
                                    {expandedSection === 'description' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {expandedSection === 'description' && (
                                    <div className="accordion-content">
                                        <p>Soothes itchy skin with natural lavender and colloidal oatmeal. Gentle enough for daily use. pH balanced for pets.</p>
                                    </div>
                                )}
                            </div>
                            <div className="accordion-item">
                                <button className="accordion-header" onClick={() => toggleSection('ingredients')}>
                                    <span>Full Ingredients</span>
                                    {expandedSection === 'ingredients' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {expandedSection === 'ingredients' && (
                                    <div className="accordion-content">
                                        <p>Water, Colloidal Oatmeal, Lavender Extract, Aloe Vera, Coconut Betaine, Vitamin E.</p>
                                    </div>
                                )}
                            </div>
                            <div className="accordion-item">
                                <button className="accordion-header" onClick={() => toggleSection('use')}>
                                    <span>How to Use</span>
                                    {expandedSection === 'use' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {expandedSection === 'use' && (
                                    <div className="accordion-content">
                                        <p>Wet coat thoroughly. Apply shampoo and massage gently into a rich lather. Rinse thoroughly.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                    <div className="reviews-header">
                        <h2>Customer Reviews</h2>
                        <div className="average-rating">
                            <Star size={24} fill="#F59E0B" color="#F59E0B" />
                            <span>{product.rating} ({product.reviews} reviews)</span>
                        </div>
                    </div>

                    <div className="review-list">
                        {reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <span className="reviewer-name">{review.name}</span>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                <div className="stars mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < review.rating ? "#F59E0B" : "none"} color="#F59E0B" />
                                    ))}
                                </div>
                                <p className="review-text">{review.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Write Review Form */}
                    <form className="review-form" onSubmit={handleReviewSubmit}>
                        <h3>Write a Review</h3>
                        <div className="star-rating-input">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="input-field"
                            placeholder="Share your thoughts..."
                            value={newReview.text}
                            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                            required
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Post Review'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
