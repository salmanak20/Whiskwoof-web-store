import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Shield, CreditCard, Lock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        Dedicated to providing the best grooming essentials for your beloved pets.
                        Quality products for happy, healthy companions.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><Twitter size={20} /></a>
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                        <a href="#" className="social-icon"><Youtube size={20} /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/signin">My Account</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Customer Service</h3>
                    <ul className="footer-links">
                        <li><Link to="/guide">Grooming Guide</Link></li>
                        <li><Link to="/shipping">Shipping Policy</Link></li>
                        <li><Link to="/returns">Returns & Exchanges</Link></li>
                        <li><Link to="/faq">FAQs</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Join</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} WhiskWoof Store. All rights reserved.</p>
                <div className="footer-trust">
                    <span><Lock size={14} /> Secure Payments</span>
                    <span><Shield size={14} /> Buyer Protection</span>
                    <span><CreditCard size={14} /> SSL Encrypted</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
