import { useState } from 'react';
import { Dog, Cat, ChevronRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './Guide.css';

const CONCERNS = {
    dog: [
        { id: 'd1', title: 'Itchy Skin', icon: '🧴', desc: 'Soothe irritation with natural oatmeal baths.' },
        { id: 'd2', title: 'Shedding Control', icon: '🐕', desc: 'Reduce loose fur with daily brushing.' },
        { id: 'd3', title: 'Dental Hygiene', icon: '🦷', desc: 'Prevent tartar with daily chews.' },
        { id: 'd4', title: 'Paw Protection', icon: '🐾', desc: 'Heal cracked pads with organic balms.' },
    ],
    cat: [
        { id: 'c1', title: 'Hairball Relief', icon: '🧶', desc: 'Specialized grooming to minimize ingestion.' },
        { id: 'c2', title: 'Stress & Anxiety', icon: '😌', desc: 'Calming pheromones for a happy kitty.' },
        { id: 'c3', title: 'Claw Care', icon: '✂️', desc: 'Safe trimming tips for scratch-happy cats.' },
        { id: 'c4', title: 'Hydration', icon: '💧', desc: 'Encourage drinking with fountains.' },
    ]
};

const Guide = () => {
    const [activeTab, setActiveTab] = useState('dog');
    const [activeConcern, setActiveConcern] = useState(null);

    const currentConcerns = CONCERNS[activeTab];

    return (
        <div className="guide-page">
            <div className="guide-header">
                <h1 className="guide-title">Pet Care Guide</h1>
                <p className="guide-subtitle">Expert tips and recommended routines for your furry friend.</p>

                <div className="pet-toggle">
                    <button
                        className={`toggle-btn ${activeTab === 'dog' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('dog'); setActiveConcern(null); }}
                    >
                        <Dog size={20} />
                        <span>Dogs</span>
                    </button>
                    <button
                        className={`toggle-btn ${activeTab === 'cat' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('cat'); setActiveConcern(null); }}
                    >
                        <Cat size={20} />
                        <span>Cats</span>
                    </button>
                </div>
            </div>

            <div className="guide-container">
                {/* Concerns Grid */}
                <section className="concerns-section">
                    <h2>Shop by Concern</h2>
                    <div className="concerns-grid">
                        {currentConcerns.map((item) => (
                            <div
                                key={item.id}
                                className={`concern-card ${activeConcern === item.id ? 'active' : ''}`}
                                onClick={() => setActiveConcern(item.id === activeConcern ? null : item.id)}
                            >
                                <div className="concern-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                {activeConcern === item.id && (
                                    <div className="concern-action">
                                        <Link to={`/shop?concern=${item.title}`}>
                                            <Button variant="outline" size="sm" className="w-full">View Products</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Article */}
                <section className="article-section">
                    <div className="article-card">
                        <div className="article-content">
                            <span className="article-tag">Featured Guide</span>
                            <h2>The Ultimate {activeTab === 'dog' ? 'Puppy' : 'Kitten'} Grooming Routine</h2>
                            <p>Start them young with positive associations. Learn the 5 steps to a stress-free bath time...</p>
                            <Link to="#" className="read-more">Read Full Article <ChevronRight size={16} /></Link>
                        </div>
                        <div className={`article-image ${activeTab === 'dog' ? 'dog-bg' : 'cat-bg'}`}></div>
                    </div>
                </section>

                {/* FAQ Teaser */}
                <section className="faq-teaser">
                    <div className="faq-icon"><HelpCircle size={32} /></div>
                    <div className="faq-text">
                        <h3>Have specific questions?</h3>
                        <p>Our veterinary experts are here to help you navigate your pet's wellness journey.</p>
                    </div>
                    <Button variant="secondary">Visit Help Center</Button>
                </section>
            </div>
        </div>
    );
};

export default Guide;
