import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import AdminStats from './AdminStats';
import Button from '../../components/Button';
import './Admin.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const { products, addProduct, categories, addCategory, deleteProduct, updateProduct } = useProducts();
    const [activeTab, setActiveTab] = useState('products');

    // Form and Editing State
    const [editingId, setEditingId] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Accessories',
        description: '',
        images: ['https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400']
    });
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [formMessage, setFormMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    // --- Image Handling ---
    const handleImageChange = (index, value) => {
        const updatedImages = [...newProduct.images];
        updatedImages[index] = value;
        setNewProduct(prev => ({ ...prev, images: updatedImages }));
    };

    const addImageField = () => {
        setNewProduct(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const removeImageField = (index) => {
        const updatedImages = newProduct.images.filter((_, i) => i !== index);
        setNewProduct(prev => ({ ...prev, images: updatedImages.length ? updatedImages : [''] }));
    };

    // --- Category Handling ---
    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        addCategory(newCategoryName);
        setNewProduct(prev => ({ ...prev, category: newCategoryName }));
        setNewCategoryName('');
        setIsAddingCategory(false);
    };

    // --- CRUD Actions ---
    const handleEdit = (product) => {
        setEditingId(product.id);
        const images = product.images || [product.image];
        setNewProduct({
            name: product.name,
            price: product.price,
            category: product.category || 'Accessories',
            description: product.description || '',
            images: images.length ? images : ['']
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price) return;

        // Ensure valid image
        const mainImage = newProduct.images[0] || 'https://via.placeholder.com/400';
        const productData = {
            ...newProduct,
            image: mainImage,
            price: parseFloat(newProduct.price),
            // Preserve existing rating/reviews if editing, else default
            rating: editingId ? (products.find(p => p.id === editingId)?.rating || 5.0) : 5.0,
            reviews: editingId ? (products.find(p => p.id === editingId)?.reviews || 0) : 0,
        };

        if (editingId) {
            updateProduct(editingId, productData);
            setFormMessage('Product updated successfully!');
            setEditingId(null);
        } else {
            addProduct(productData);
            setFormMessage('Product added successfully!');
        }

        // Reset Form
        setNewProduct({
            name: '',
            price: '',
            category: categories[0] || 'Accessories',
            description: '',
            images: [mainImage] // Keep accessible default or reset
        });

        setTimeout(() => setFormMessage(''), 3000);
    };

    if (!user || user.role !== 'admin') {
        return <div className="p-8 text-center text-red-500">Access Denied. Admins only.</div>;
    }

    return (
        <div className="admin-dashboard page-container">
            <header className="admin-header">
                <div className="admin-header-content">
                    <h1>Admin Console</h1>
                    <p className="admin-subtitle">Manage your store | Welcome, {user.name}</p>
                </div>
                <div className="admin-actions">
                    <Button variant="outline" onClick={() => window.open('/', '_blank')}>View Store</Button>
                </div>
            </header>

            <div className="admin-layout">
                <aside className="admin-sidebar">
                    <nav className="admin-nav">
                        <button
                            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            📦 Product Management
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'sales' ? 'active' : ''}`}
                            onClick={() => setActiveTab('sales')}
                        >
                            📊 Sales Analytics
                        </button>
                    </nav>
                </aside>

                <main className="admin-main-content">
                    {activeTab === 'products' ? (
                        <div className="product-manager-container">
                            {/* Editor Section */}
                            <div className="form-section glass-panel">
                                <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                                {formMessage && <div className="success-msg">{formMessage}</div>}

                                <form onSubmit={handleSubmit} className="admin-form">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newProduct.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Luxury Silk Shampoo"
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Price ($)</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={newProduct.price}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            {!isAddingCategory ? (
                                                <div className="flex gap-2">
                                                    <select
                                                        name="category"
                                                        value={newProduct.category}
                                                        onChange={handleInputChange}
                                                        style={{ flex: 1 }}
                                                    >
                                                        {categories.map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                    <Button type="button" size="sm" variant="outline" onClick={() => setIsAddingCategory(true)}>+</Button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="New Category Name"
                                                        value={newCategoryName}
                                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                                        autoFocus
                                                    />
                                                    <Button type="button" size="sm" onClick={handleAddCategory}>Add</Button>
                                                    <Button type="button" size="sm" variant="outline" onClick={() => setIsAddingCategory(false)}>✕</Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            value={newProduct.description}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="Describe the product..."
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Product Images</label>
                                        {newProduct.images.map((img, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={img}
                                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                                {index > 0 && (
                                                    <Button type="button" size="sm" variant="outline" onClick={() => removeImageField(index)}>✕</Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button type="button" size="sm" variant="outline" onClick={addImageField}>+ Add Another Image</Button>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" variant="primary" fullWidth>
                                            {editingId ? 'Update Product' : '🚀 Publish Product'}
                                        </Button>
                                        {editingId && (
                                            <Button type="button" variant="outline" onClick={() => {
                                                setEditingId(null);
                                                setNewProduct({ name: '', price: '', category: categories[0], description: '', images: [''] });
                                            }}>Cancel</Button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Existing Products List */}
                            <div className="glass-panel" style={{ marginTop: '2rem' }}>
                                <h2>Info about Product</h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id}>
                                                    <td>
                                                        <img src={product.image || product.images?.[0]} alt={product.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>${product.price.toFixed(2)}</td>
                                                    <td><span className="product-tag">{product.category}</span></td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>✏️ Edit</Button>
                                                            <Button size="sm" variant="outline" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => handleDelete(product.id)}>Trash</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {products.length === 0 && (
                                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No products found.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <AdminStats />
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
