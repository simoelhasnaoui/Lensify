import React from 'react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <Logo size={28} />
                            <div className="footer-logo" style={{ marginBottom: 0 }}>Lensify</div>
                        </div>
                        <p className="footer-tagline">The world's best photography.</p>
                    </div>

                    <div className="footer-links">
                        <div className="link-group">
                            <h3>Community</h3>
                            <a href="#">Editor's Choice</a>
                            <a href="#">Quests</a>
                            <a href="#">Portfolio</a>
                        </div>
                        <div className="link-group">
                            <h3>Licensing</h3>
                            <a href="#">About Licensing</a>
                            <a href="#">Become a Contributor</a>
                            <a href="#">Submission Requirements</a>
                        </div>
                        <div className="link-group">
                            <h3>Company</h3>
                            <a href="#">About Us</a>
                            <a href="#">Careers</a>
                            <a href="#">Press</a>
                        </div>
                    </div>
                </div>

                <hr className="footer-divider" />

                <div className="footer-bottom">
                    <p className="copyright">&copy; 2026 Lensify. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#">Twitter</a>
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to reset all app data (uploads, accounts, likes)?')) {
                                    localStorage.clear();
                                    window.location.reload();
                                }
                            }}
                            className="nav-link"
                            style={{ fontSize: '0.8rem', color: '#ff4b2b', marginLeft: '1rem' }}
                        >
                            Reset App Data
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
