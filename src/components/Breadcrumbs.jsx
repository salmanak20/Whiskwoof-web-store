import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
    const location = useLocation();
    let pathnames = location.pathname.split('/').filter((x) => x);

    // Filter out potential numeric IDs for cleaner breadcrumbs if needed, 
    // or keep them but maybe format them better (e.g. "Product 123")
    // For now, simple path splitting.

    if (pathnames.length === 0) {
        return null;
    }

    return (
        <nav className="breadcrumbs" aria-label="breadcrumb">
            <div className="breadcrumbs-container">
                <Link to="/">Home</Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // Decode URL safe strings and capitalize
                    const displayName = decodeURIComponent(value)
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                    return (
                        <span key={to} className="breadcrumb-item">
                            <span className="breadcrumb-separator">/</span>
                            {isLast ? (
                                <span className="breadcrumb-current" aria-current="page">
                                    {displayName}
                                </span>
                            ) : (
                                <Link to={to}>{displayName}</Link>
                            )}
                        </span>
                    );
                })}
            </div>
        </nav>
    );
};

export default Breadcrumbs;
