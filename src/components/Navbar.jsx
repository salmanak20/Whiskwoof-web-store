import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, PawPrint, LogOut, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const { wishlist } = useWishlist();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                {/* Mobile Menu Toggle */}
                <button className="icon-btn mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <PawPrint className="logo-icon" size={28} />
                    <span className="logo-text">WhiskWoof</span>
                </Link>

                {/* Search Bar - Hidden on small mobile */}
                <div className="navbar-search">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>

                {/* Desktop Nav Links */}
                <nav className="navbar-links">
                    <NavLink to="/shop" end>Shop All</NavLink>
                    <NavLink to="/shop?category=Dogs">Dogs</NavLink>
                    <NavLink to="/shop?category=Cats">Cats</NavLink>
                    <NavLink to="/guide">Care Guide</NavLink>
                    {user?.role === 'admin' && <Link to="/admin" className="text-primary font-bold">Admin</Link>}
                </nav>

                {/* Actions */}
                <div className="navbar-actions">
                    <div className="navbar-auth-buttons">
                        {user ? (
                            <div className="user-menu">
                                <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                                <button onClick={logout} className="icon-btn" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/signin">
                                    <Button variant="outline" size="sm" className="auth-btn">Sign In</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" size="sm" className="auth-btn">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                    {/* Only show search on mobile if not in menu */}
                    <button className="icon-btn mobile-search-btn" aria-label="Search mobile">
                        <Search size={24} />
                    </button>

                    <Link to="/wishlist" className="icon-btn wishlist-btn-nav">
                        <Heart size={24} />
                        {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
                    </Link>

                    <Link to="/cart" className="icon-btn cart-btn">
                        <ShoppingBag size={24} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    <Link to="/profile" className="icon-btn profile-btn">
                        {user ? <div className="avatar-placeholder">{user.name[0]}</div> : <User size={24} />}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-menu-links">
                    <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/shop" onClick={() => setIsMenuOpen(false)}>Shop All</NavLink>
                    <NavLink to="/shop?category=Dogs" onClick={() => setIsMenuOpen(false)}>Dogs</NavLink>
                    <NavLink to="/shop?category=Cats" onClick={() => setIsMenuOpen(false)}>Cats</NavLink>
                    <NavLink to="/guide" onClick={() => setIsMenuOpen(false)}>Care Guide</NavLink>
                    {user?.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}

                    {!user && (
                        <div className="mobile-auth-buttons">
                            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" fullWidth>Sign In</Button>
                            </Link>
                            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="primary" fullWidth>Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
