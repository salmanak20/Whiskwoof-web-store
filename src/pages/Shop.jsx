import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { useProducts } from '../context/ProductContext';
import './Shop.css';

const CATEGORIES = ['All', 'Shampoos', 'Brushes', 'Wellness', 'Dental', 'Accessories', 'Toys', 'Bedding', 'Food'];
const PRICE_RANGES = [
    { label: 'All Prices', min: 0, max: 1000 },
    { label: 'Under $15', min: 0, max: 15 },
    { label: '$15 - $30', min: 15, max: 30 },
    { label: '$30+', min: 30, max: 1000 },
];

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const searchQuery = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
    const [sortBy, setSortBy] = useState('featured');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Get products from context
    const { products } = useProducts();

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        result = result.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [selectedCategory, selectedPrice, sortBy, searchQuery, products]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setSearchParams(cat === 'All' ? {} : { category: cat });
        setShowMobileFilters(false);
    };

    return (
        <div className="shop-page">
            {/* Header */}
            <div className="shop-header">
                <h1 className="shop-title">Grooming Essentials</h1>
                <p className="shop-subtitle">Premium products for your pet's daily care routine.</p>
            </div>

            <div className="shop-content-wrapper">
                {/* Sidebar Filters */}
                <aside className={`shop-sidebar ${showMobileFilters ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <h3>Filters</h3>
                        <button className="close-filters" onClick={() => setShowMobileFilters(false)}>×</button>
                    </div>

                    <div className="filter-group">
                        <h4>Category</h4>
                        <div className="filter-options">
                            {CATEGORIES.map(cat => (
                                <label key={cat} className="radio-label">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === cat}
                                        onChange={() => handleCategoryChange(cat)}
                                    />
                                    <span className="radio-custom"></span>
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4>Price Range</h4>
                        <div className="filter-options">
                            {PRICE_RANGES.map((range, idx) => (
                                <label key={idx} className="radio-label">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={selectedPrice.label === range.label}
                                        onChange={() => { setSelectedPrice(range); setShowMobileFilters(false); }}
                                    />
                                    <span className="radio-custom"></span>
                                    {range.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <main className="shop-main">
                    {/* Controls */}
                    <div className="shop-controls">
                        <Button
                            variant="outline"
                            size="sm"
                            className="filter-toggle-btn"
                            onClick={() => setShowMobileFilters(true)}
                        >
                            <SlidersHorizontal size={16} style={{ marginRight: '0.5rem' }} />
                            Filters
                        </Button>

                        <span className="product-count">{filteredProducts.length} Results</span>

                        <div className="sort-dropdown-wrapper">
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                            <ChevronDown size={14} className="sort-icon" />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="shop-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="no-results">
                                <h3>No products found</h3>
                                <p>Try adjusting your filters.</p>
                                <Button
                                    variant="outline"
                                    onClick={() => { setSelectedCategory('All'); setSelectedPrice(PRICE_RANGES[0]); }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Shop;
