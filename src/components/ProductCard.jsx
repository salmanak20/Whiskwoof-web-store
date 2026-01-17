import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    const isWishlisted = isInWishlist(product.id);

    return (
        <Card className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                {product.tag && (
                    <Badge
                        variant={product.tag === 'Natural' ? 'accent' : product.tag === 'New' ? 'success' : 'primary'}
                        className="product-tag"
                    >
                        {product.tag}
                    </Badge>
                )}
                <button
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={handleWishlist}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-rating">
                    ⭐ {product.rating} <span className="text-light">({product.reviews})</span>
                </div>
                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <Button
                        variant="primary"
                        size="sm"
                        className="btn-icon add-cart-btn"
                        onClick={handleAddToCart}
                        aria-label="Add to Cart"
                    >
                        <ShoppingBag size={20} />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
