import React, { useState, useEffect } from 'react';
import { Search, Bell, Upload, Menu, X } from 'lucide-react';
import Logo from './Logo';
import AuthModal from './AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onUploadClick, onHomeClick, onNavigate, onSearch, currentUser, onLogin, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openAuth = (mode) => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const handleProtectedAction = (action) => {
        if (!currentUser) {
            openAuth('login');
        } else {
            action();
        }
    };

    return (
        <>
            <nav className={`nav-fixed ${isScrolled ? 'nav-scrolled' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div
                        onClick={onHomeClick}
                        style={{ cursor: 'pointer', fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                        <Logo size={36} />
                        <span className="md-inline" style={{ letterSpacing: '-0.03em' }}>Lensify</span>
                    </div>

                    <div className="md-hide" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Discover</a>
                        <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('licensing'); }}>Licensing</a>
                        <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('quests'); }}>Quests</a>
                    </div>
                </div>

                <div className="md-hide" style={{ flex: 1, maxWidth: '400px', margin: '0 2rem', position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#666' }} />
                    <input
                        type="text"
                        placeholder="Search Lensify"
                        className="search-input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSearch && onSearch(e.currentTarget.value);
                                e.currentTarget.value = '';
                                e.currentTarget.blur();
                            }
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <button
                        onClick={() => handleProtectedAction(onUploadClick)}
                        className="nav-link"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Upload size={18} />
                        <span className="md-inline">Upload</span>
                    </button>

                    {!currentUser ? (
                        <>
                            <button className="nav-link" onClick={() => openAuth('login')}>Log In</button>
                            <button
                                className="profile-btn primary"
                                style={{ padding: '0.6rem 1.2rem' }}
                                onClick={() => openAuth('signup')}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <Bell 
                                        size={20} 
                                        color={isNotificationsOpen ? "white" : "#aaa"} 
                                        style={{ cursor: 'pointer', transition: 'color 0.2s' }} 
                                        onClick={() => {
                                            setIsNotificationsOpen(!isNotificationsOpen);
                                            setIsDropdownOpen(false);
                                        }}
                                    />
                                    {/* Unread indicator dot */}
                                    <div style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: '#ff4b2b', borderRadius: '50%', border: '2px solid #000' }} />
                                </div>
                                
                                {isNotificationsOpen && (
                                    <div className="glass" style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 15px)',
                                        right: '-10px',
                                        width: '320px',
                                        borderRadius: '12px',
                                        padding: '0.5rem',
                                        zIndex: 1000,
                                        border: '1px solid var(--glass-border)',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
                                    }}>
                                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Notifications</h3>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 600 }}>Mark all as read</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '350px', overflowY: 'auto' }}>
                                            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(8,102,255,0.05)' }}>
                                                <div style={{ width: '8px', height: '8px', background: '#0866ff', borderRadius: '50%', marginTop: '0.4rem', flexShrink: 0 }} />
                                                <div>
                                                    <p style={{ fontSize: '0.85rem', margin: '0 0 0.25rem 0', lineHeight: 1.4 }}><strong>Lensify Team</strong> just launched a new <strong>Minimalist Architecture</strong> quest!</p>
                                                    <span style={{ fontSize: '0.75rem', color: '#666' }}>2 hours ago</span>
                                                </div>
                                            </div>
                                            <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                <div style={{ width: '8px', height: '8px', background: 'transparent', borderRadius: '50%', marginTop: '0.4rem', flexShrink: 0 }} />
                                                <div>
                                                    <p style={{ fontSize: '0.85rem', margin: '0 0 0.25rem 0', lineHeight: 1.4, color: '#bbb' }}>Welcome to the community! Take a look around and share your first masterpiece.</p>
                                                    <span style={{ fontSize: '0.75rem', color: '#666' }}>1 day ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ position: 'relative' }}>
                                <div
                                    onClick={() => {
                                        setIsDropdownOpen(!isDropdownOpen);
                                        setIsNotificationsOpen(false);
                                    }}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundImage: `url(${currentUser.avatar})`,
                                        backgroundSize: 'cover',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        cursor: 'pointer'
                                    }}
                                />
                                {isDropdownOpen && (
                                    <div className="glass" style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 10px)',
                                        right: 0,
                                        width: '200px',
                                        borderRadius: '12px',
                                        padding: '0.5rem',
                                        zIndex: 1000,
                                        border: '1px solid var(--glass-border)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                    }}>
                                        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '0.5rem' }}>
                                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{currentUser.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#666' }}>Pro Member</p>
                                        </div>
                                        <button className="nav-link" style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem' }}>Profile</button>
                                        <button className="nav-link" style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem' }}>Settings</button>
                                        <button
                                            onClick={() => {
                                                onLogout();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="nav-link"
                                            style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', color: '#ff4b2b' }}
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="md-show">
                        <button 
                            className="nav-link" 
                            style={{ padding: '0.5rem' }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass"
                        style={{
                            position: 'fixed',
                            top: '72px',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 99,
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            background: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div style={{ position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#666' }} />
                            <input
                                type="text"
                                placeholder="Search everything"
                                className="search-input"
                                style={{ padding: '1rem 1rem 1rem 3.5rem', fontSize: '1.1rem' }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onSearch && onSearch(e.currentTarget.value);
                                        setIsMenuOpen(false);
                                    }
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <a href="/" className="nav-link" style={{ fontSize: '1.2rem' }} onClick={(e) => { e.preventDefault(); onHomeClick(); setIsMenuOpen(false); }}>Discover</a>
                            <a href="/" className="nav-link" style={{ fontSize: '1.2rem' }} onClick={(e) => { e.preventDefault(); onNavigate('licensing'); setIsMenuOpen(false); }}>Licensing</a>
                            <a href="/" className="nav-link" style={{ fontSize: '1.2rem' }} onClick={(e) => { e.preventDefault(); onNavigate('quests'); setIsMenuOpen(false); }}>Quests</a>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                onClick={() => handleProtectedAction(() => { onUploadClick(); setIsMenuOpen(false); })}
                                className="profile-btn primary"
                                style={{ padding: '1rem' }}
                            >
                                <Upload size={20} style={{ marginRight: '0.5rem' }} /> Upload Photo
                            </button>
                            {!currentUser && (
                                <button
                                    className="profile-btn secondary"
                                    style={{ padding: '1rem' }}
                                    onClick={() => { openAuth('login'); setIsMenuOpen(false); }}
                                >
                                    Log In / Sign Up
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onLogin={onLogin}
                initialMode={authMode}
            />
        </>
    );
};

export default Navbar;
