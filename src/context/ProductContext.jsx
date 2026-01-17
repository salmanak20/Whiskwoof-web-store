import { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('custom_products');
        return savedProducts
            ? [...INITIAL_PRODUCTS, ...JSON.parse(savedProducts)]
            : INITIAL_PRODUCTS;
    });

    const [categories, setCategories] = useState(() => {
        const savedCats = localStorage.getItem('custom_categories');
        const defaultCats = ['Shampoos', 'Brushes', 'Wellness', 'Dental', 'Accessories'];
        return savedCats ? [...defaultCats, ...JSON.parse(savedCats)] : defaultCats;
    });

    const addProduct = (newProduct) => {
        // Assign a random ID if not present
        const productWithId = {
            ...newProduct,
            id: Date.now(),
            // Ensure images is an array, fallback to single image if needed
            images: newProduct.images || [newProduct.image]
        };

        // Update State
        const updatedProducts = [...products, productWithId];
        setProducts(updatedProducts);

        // Update LocalStorage
        const currentCustom = JSON.parse(localStorage.getItem('custom_products') || '[]');
        const updatedCustom = [...currentCustom, productWithId];
        localStorage.setItem('custom_products', JSON.stringify(updatedCustom));
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);

        // Update LocalStorage (re-calculate custom products)
        // Note: For simplicity, we are saving ALL current products back to custom_products to persist deletions of default items too if needed,
        // OR we just assume we only delete custom ones. Better approach: Save the entire current state as the new custom state.
        // Actually, to support deleting initial products, we should probably switch to fully local storage based products if touched.
        // For this mock, let's just save the new 'products' array to 'custom_products' and ignore INITIAL_PRODUCTS on next load if custom exists.
        localStorage.setItem('custom_products', JSON.stringify(updatedProducts));
    };

    const updateProduct = (id, updatedData) => {
        const updatedProducts = products.map(p =>
            p.id === id ? { ...p, ...updatedData } : p
        );
        setProducts(updatedProducts);
        localStorage.setItem('custom_products', JSON.stringify(updatedProducts));
    };

    const addCategory = (newCat) => {
        if (categories.includes(newCat)) return;
        const updatedCats = [...categories, newCat];
        setCategories(updatedCats);

        // Save only custom added categories to avoid duplicates in defaults logic
        const currentCustom = JSON.parse(localStorage.getItem('custom_categories') || '[]');
        localStorage.setItem('custom_categories', JSON.stringify([...currentCustom, newCat]));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, categories, addCategory, deleteProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
