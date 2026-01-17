import React from 'react';

const AdminStats = () => {
    // Mock Data for Visuals


    const categoryData = [
        { name: 'Shampoos', sales: 120, max: 400, color: '#8b5cf6' },
        { name: 'Brushes', sales: 85, max: 400, color: '#10b981' },
        { name: 'Wellness', sales: 210, max: 400, color: '#f59e0b' },
        { name: 'Dental', sales: 320, max: 400, color: '#3b82f6' },
    ];

    const calculateWidth = (val, max) => `${(val / max) * 100}%`;

    return (
        <div className="admin-stats-container">
            <div className="dashboard-grid">
                {/* Revenue Card */}
                <div className="stat-card premium-card">
                    <div className="stat-icon-wrapper bg-violet-100">
                        <span className="stat-icon">💰</span>
                    </div>
                    <div className="stat-content">
                        <h3>Total Revenue</h3>
                        <p className="stat-value text-gradient">$14,222</p>
                        <span className="stat-sub">+12% from last month</span>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="stat-card premium-card">
                    <div className="stat-icon-wrapper bg-emerald-100">
                        <span className="stat-icon">📦</span>
                    </div>
                    <div className="stat-content">
                        <h3>Total Orders</h3>
                        <p className="stat-value">735</p>
                        <span className="stat-sub">+5% from last month</span>
                    </div>
                </div>

                {/* Customers Card */}
                <div className="stat-card premium-card">
                    <div className="stat-icon-wrapper bg-amber-100">
                        <span className="stat-icon">👥</span>
                    </div>
                    <div className="stat-content">
                        <h3>New Customers</h3>
                        <p className="stat-value">128</p>
                        <span className="stat-sub">+18% from last month</span>
                    </div>
                </div>
            </div>

            {/* Visual Charts Section */}
            <div className="analytics-section premium-card">
                <h3 className="section-title">Sales by Category</h3>
                <div className="charts-container">
                    {categoryData.map((cat, idx) => (
                        <div key={idx} className="chart-row">
                            <div className="chart-label">
                                <span>{cat.name}</span>
                                <span className="chart-val">{cat.sales} sold</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: calculateWidth(cat.sales, cat.max),
                                        backgroundColor: cat.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
