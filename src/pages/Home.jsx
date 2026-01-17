import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award, Clock, Leaf } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Home.css';

import { PRODUCTS } from '../data/products';

// Derived State
const BEST_SELLERS = PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 4);

const SHOP_CATEGORIES = [
    {
        id: 'dogs',
        name: 'Shop for Dogs',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
        link: '/shop?category=Dogs',
        color: 'var(--color-primary-light)'
    },
    {
        id: 'cats',
        name: 'Shop for Cats',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
        link: '/shop?category=Cats',
        color: 'var(--color-secondary)'
    }
];

const REVIEWS = [
    {
        id: 1,
        user: 'Sarah M.',
        text: "The best shampoo I've ever used for my golden retriever. He smells amazing!",
        rating: 5,
        pet: 'Golden Retriever'
    },
    {
        id: 2,
        user: 'Mike T.',
        text: "Fast shipping and great quality products. My cat loves the toys.",
        rating: 5,
        pet: 'Tabby Cat'
    },
    {
        id: 3,
        user: 'Jessica L.',
        text: "Finally found a brand I can trust. The ingredients are actually natural.",
        rating: 5,
        pet: 'French Bulldog'
    }
];

const AnimatedSection = ({ children, className = '' }) => {
    const [ref, isVisible] = useScrollAnimation();
    return (
        <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}>
            {children}
        </div>
    );
};

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content fade-in-section is-visible">
                    <span className="hero-badge">New Summer Collection ☀️</span>
                    <h1 className="hero-title">The Best Care<br />For Your Best Friend</h1>
                    <p className="hero-subtitle">Discover vet-approved, natural essentials that keep tails wagging and kitties purring. Because they aren't just pets, they're family.</p>
                    <div className="hero-buttons">
                        <Link to="/shop">
                            <Button size="lg" variant="accent" className="hero-btn">Shop Now <ArrowRight size={20} /></Button>
                        </Link>
                        <Link to="/guide">
                            <Button size="lg" variant="outline" className="hero-btn-secondary">Care Guide</Button>
                        </Link>
                    </div>
                    <div className="hero-trust">
                        <div className="trust-item"><CheckCircle size={16} /> Vet Approved</div>
                        <div className="trust-item"><CheckCircle size={16} /> Free Shipping &gt;$50</div>
                    </div>
                </div>
                <div className="hero-image-container fade-in-section is-visible" style={{ transitionDelay: '200ms' }}>
                    <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=1200" alt="Happy Dog" className="hero-image" />
                </div>
            </section>

            {/* Shop Categories */}
            <AnimatedSection className="section">
                <div className="categories-split">
                    {SHOP_CATEGORIES.map((cat) => (
                        <Link to={cat.link} key={cat.id} className="category-split-card">
                            <div className="category-image-wrapper">
                                <img src={cat.image} alt={cat.name} />
                            </div>
                            <div className="category-content">
                                <h3>{cat.name}</h3>
                                <span className="link-text">Shop Now <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </AnimatedSection>

            {/* Best Sellers */}
            <AnimatedSection className="section bg-secondary-light">
                <div className="container">
                    <SectionHeader title="Customer Favorites" subtitle="Loved by pets everywhere" actionText="View all products" actionLink="/shop" />
                    <div className="product-grid">
                        {BEST_SELLERS.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Value Props */}
            <AnimatedSection className="section values-section">
                <div className="container">
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon bg-teal"><Leaf size={28} /></div>
                            <h3>Safe & Natural</h3>
                            <p>Gentle, non-toxic ingredients lovingly chosen for your pet's well-being.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon bg-blue"><Award size={28} /></div>
                            <h3>Vet Recommended</h3>
                            <p>Formulated with experts to ensure safety and effectiveness.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon bg-orange"><Clock size={28} /></div>
                            <h3>Quick & Reliable</h3>
                            <p>Fast shipping because we know your pet can't wait.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon bg-purple"><Shield size={28} /></div>
                            <h3>Satisfaction Promise</h3>
                            <p>If you or your pet aren't happy, we'll make it right.</p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Reviews */}
            <AnimatedSection className="section reviews-section">
                <div className="container">
                    <h2 className="section-title text-center">Paw-sitive Reviews 🐾</h2>
                    <div className="reviews-grid">
                        {REVIEWS.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="stars">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
                                    ))}
                                </div>
                                <p className="review-text">"{review.text}"</p>
                                <div className="review-author">
                                    <strong>{review.user}</strong>
                                    <span>Owner of a {review.pet}</span>
                                    <div className="verified-badge">
                                        <CheckCircle size={14} /> Verified Owner
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Newsletter */}
            <section className="newsletter-section">
                <div className="newsletter-content">
                    <h2>Join the Pack</h2>
                    <p>Get exclusive offers, pet care tips, and 10% off your first order.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <Button variant="primary">Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const CheckCircle = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default Home;
