import { Link } from 'react-router-dom';
import './SectionHeader.css';

const SectionHeader = ({ title, actionText, actionLink }) => {
    return (
        <div className="section-header">
            <h2 className="section-title">{title}</h2>
            {actionText && actionLink && (
                <Link to={actionLink} className="section-action">
                    {actionText}
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
