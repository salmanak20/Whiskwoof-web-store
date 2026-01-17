import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import Breadcrumbs from './Breadcrumbs';

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <Breadcrumbs />

            {/* Main Content with padding for bottom nav on mobile */}
            <main style={{ paddingBottom: '80px' }}> {/* prevent content from being hidden behind bottom nav */}
                <Outlet />
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default Layout;
