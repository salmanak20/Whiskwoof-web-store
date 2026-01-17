import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h1>My Wishlist</h1>
                <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
            </div>

            {wishlist.length > 0 ? (
                <div className="wishlist-grid">
                    {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="wishlist-empty">
                    <p>Your wishlist is empty.</p>
                    <Link to="/shop">
                        <Button variant="primary">Start Shopping</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
