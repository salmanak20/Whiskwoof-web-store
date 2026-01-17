import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bottom-nav">
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                <Home size={24} />
                <span>Home</span>
            </Link>
            <Link to="/shop" className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
                <Grid size={24} />
                <span>Shop</span>
            </Link>
            <Link to="/cart" className={`nav-item ${isActive('/cart') ? 'active' : ''}`}>
                <div style={{ position: 'relative' }}>
                    <ShoppingBag size={24} />
                    {/* Optional badge here too */}
                    <span className="bottom-cart-badge">2</span>
                </div>
                <span>Cart</span>
            </Link>
            <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
                <User size={24} />
                <span>Profile</span>
            </Link>
        </nav>
    );
};

export default BottomNav;
