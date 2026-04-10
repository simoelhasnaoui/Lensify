import React from 'react';
import { Search } from 'lucide-react';

const Hero = ({ onTagClick, onSearch }) => {
    return (
        <section className="hero-section">
            <div className="hero-overlay" />
            <div className="hero-content container">
                <h1 className="hero-title">Discover the world’s best photography</h1>
                <p className="hero-subtitle">Get inspired and share your best photos with the world.</p>

                <div className="hero-search-container">
                    <Search className="hero-search-icon" />
                    <input
                        type="text"
                        placeholder="Search everything"
                        className="hero-search-input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSearch && onSearch(e.currentTarget.value);
                                e.currentTarget.value = '';
                                e.currentTarget.blur();
                            }
                        }}
                    />
                </div>

                <div className="hero-tags" style={{ flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                    <span className="tag-label" style={{ marginBottom: '0.5rem' }}>Trending:</span>
                    <button className="tag" onClick={() => onTagClick && onTagClick('Nature')}>Nature</button>
                    <button className="tag" onClick={() => onTagClick && onTagClick('Architecture')}>Architecture</button>
                    <button className="tag" onClick={() => onTagClick && onTagClick('Street')}>Street</button>
                    <button className="tag" onClick={() => onTagClick && onTagClick('Travel')}>Travel</button>
                </div>
            </div>

            <div className="hero-meta">
                <span className="photo-credit">Photo by <strong>Alex Rivers</strong></span>
            </div>
        </section>
    );
};

export default Hero;
