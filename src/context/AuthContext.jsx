import { createContext, useState, useContext, useEffect } from 'react';
import { isShopifyConfigured } from '../lib/shopify';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for existing session (Mock or Shopify)
        const storedUser = localStorage.getItem('user_token');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            // 1. Check for Specific Admin Credentials FIRST
            if (email === 'salmanyousafzai736@gmail.com' && password === 'Salman@123') {
                await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
                const adminUser = {
                    id: 'admin_001',
                    email,
                    name: 'Salman Y. (Admin)',
                    role: 'admin'
                };
                setUser(adminUser);
                localStorage.setItem('user_token', JSON.stringify(adminUser));
                return;
            }

            // 2. If not admin, check Shopify Config
            if (isShopifyConfigured()) {
                // Real Shopify Login (Future Implementation)
                throw new Error("Shopify Login not yet fully implemented. Please use Mock keys.");
            } else {
                // 3. Mock Login for Regular Users
                await new Promise(resolve => setTimeout(resolve, 800));

                if (email.includes('@')) {
                    const fakeUser = {
                        id: `user_${Date.now()}`,
                        email,
                        name: 'Happy Customer',
                        role: 'customer'
                    };
                    setUser(fakeUser);
                    localStorage.setItem('user_token', JSON.stringify(fakeUser));
                } else {
                    throw new Error("Invalid email format");
                }
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email) => {
        setLoading(true);
        setError(null);
        try {
            // Mock Registration
            await new Promise(resolve => setTimeout(resolve, 1000));
            const newUser = { id: Date.now(), email, name, role: 'customer' };
            setUser(newUser);
            localStorage.setItem('user_token', JSON.stringify(newUser));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_token');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
