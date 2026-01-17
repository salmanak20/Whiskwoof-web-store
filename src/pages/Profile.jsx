import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, LogOut } from 'lucide-react';
import Button from '../components/Button';
import './Profile.css';

const MOCK_ORDERS = [
    {
        id: '#ORD-7829',
        date: 'Oct 24, 2023',
        status: 'Delivered',
        total: 45.99,
        items: [
            { name: 'Organic Oatmeal Shampoo', qty: 1 },
            { name: 'Slicker Brush', qty: 1 }
        ]
    },
    {
        id: '#ORD-8901',
        date: 'Nov 12, 2023',
        status: 'Processing',
        total: 28.50,
        items: [
            { name: 'Dental Chews (Pack of 3)', qty: 2 }
        ]
    }
];

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* User Info Card */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-info">
                        <h1>{user.name}</h1>
                        <div className="profile-email">{user.email}</div>
                        <span className="profile-role">{user.role === 'admin' ? 'Administrator' : 'Verified Customer'}</span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        style={{ marginLeft: 'auto' }}
                    >
                        <LogOut size={16} style={{ marginRight: '0.5rem' }} />
                        Sign Out
                    </Button>
                </div>

                {/* Order History */}
                <div className="orders-section">
                    <h2><Package style={{ verticalAlign: 'middle', marginRight: '0.75rem' }} /> Order History</h2>

                    {MOCK_ORDERS.length > 0 ? (
                        <div className="orders-list">
                            {MOCK_ORDERS.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <span className="order-id">{order.id}</span>
                                            <span className="order-date"> • {order.date}</span>
                                        </div>
                                        <span className={`order-status ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <ul className="order-items">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="order-item">
                                                <span>{item.name}</span>
                                                <span>x{item.qty}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="order-footer">
                                        <span>Total: ${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-orders">
                            <p>You haven't placed any orders yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
